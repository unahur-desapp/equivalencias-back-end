const express = require('express');
const multer = require('multer');
const path = require('path');

const { Storage } = require('@google-cloud/storage');

const router = express.Router();

// multer config
const multerStorage = multer.memoryStorage();
//const multerFileHandler = multer({ storage: multerStorage });

const multerFileHandler = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
        // Verificar el tipo de archivo
        if (file.mimetype === 'application/pdf') {
            // Permitir la carga
            cb(null, true);
        } else {
            // Rechazar el archivo
            cb(null, false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB en bytes
    },
});

// Google Storage config
//Para generar el key file seguir:
//https://www.ibm.com/docs/en/urbancode-deploy/7.0.0?topic=platform-creating-key-file-google-cloud.
const gcs = new Storage({
    projectId: 'equivalencias-389822',
    keyFilename: './equivalencias-389822-3edae589ff6d.json',
});

//Dentro del bucket, ir a configuración -> Descripción
//Copiar "URL de gsutil"
const storage = gcs.bucket('gs://archivos_ma');

//Busca el archivo con determinado nombre y lo devuelve
async function fetchFileFromGoogleStorage(filename) {
    const fileObject = storage.file(filename);
    const fileContents = await fileObject.download();
    console.log('in fetchFileFromGoogleStorage');
    console.log(fileContents.length);
    //Contenido del archivo descargado
    return fileContents[0];
}

//Chequea si existe el archivo con determinado nombre
async function checkFileExists(fileName) {
    const file = storage.file(fileName);
    try {
        const [exists] = await file.exists();
        return {
            exists,
            fileName: exists ? fileName : null,
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            exists: false,
            fileName: null,
        };
    }
}

//Chequea si el archivo existe en el storage, en cuyo caso, devuelve el nombre del archivo
//Usado por compatibilidad con el código anterior
router.get('/f/:filename', async (request, response) => {
    const fileName = `${request.params.filename}`;
    checkFileExists(fileName)
        .then((result) => {
            if (result.exists) {
                response.json(result.fileName);
                console.log(`El archivo "${result.fileName}" existe".`);
            } else {
                response.json(result.fileName);
                console.log(`El archivo "${fileName}" no existe".`);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

router.get('/:filename', async (request, response) => {
    const filename = `${request.params.filename}`;
    const downloadedPdfFile = await fetchFileFromGoogleStorage(filename);
    response.status(200);
    response.type('application/pdf');
    response.send(downloadedPdfFile);
});

router.post(
    '/',
    multerFileHandler.single('uploadedPdf'),
    async (request, response) => {
        // observo el request
        console.log(Object.keys(request.file));
        console.log({
            originalname: request.file.originalname,
            mimetype: request.file.mimetype,
        });
        console.log(request.body.filename);

        const fileExtension = path.extname(request.file.originalname);
        const fileName = request.file.originalname.split(fileExtension)[0];
        const newFileName = `${fileName}-${Date.now()}${fileExtension}`;

        // implemento el upload

        //const newFilePath = `${request.body.filename}`;
        const newFilePath = `${newFileName}`;

        // paso 1 - se crean el archivo, y el stream donde se va a inyectar el contenido
        const blob = storage.file(newFilePath);
        const blobStream = blob.createWriteStream();

        // paso 2 - se inyecta el contenido
        // a mí tampoco me gusta cómo queda el código, pero no encontré alternativa
        // cfr la documentación - https://cloud.google.com/appengine/docs/flexible/using-cloud-storage?tab=node.js#top
        blobStream.on('error', (err) => {
            response.status(500);
            response.json({ ok: false, errorDescription: err });
        });

        blobStream.on('finish', () => {
            response.status(200);
            response.type('string');
            //response.json(newFilePath);
            response.send(newFilePath);
        });
        blobStream.end(request.file.buffer);
    }
);

router.delete('/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        // Elimina el archivo del bucket
        await storage.file(filename).delete();
        res
            .status(200)
            .json({ message: `Archivo ${filename} eliminado correctamente` });
    } catch (error) {
        console.error('Error al eliminar el archivo:', error);
        res.status(500).json({ error: 'Error al eliminar el archivo' });
    }
});

export default router;
