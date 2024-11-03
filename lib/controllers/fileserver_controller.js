const multer = require('multer');
const path = require('path');
const fs = require('fs');
const directorio = '../../../fileserver/archivos/';

// Configuración de Multer
export const storage = multer.diskStorage({
    destination: path.join(__dirname, directorio),
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileName = file.originalname.split(fileExtension)[0];
        cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    },
});

export const upload = multer({ storage });

// Controlador para la subida de archivos
export const subirArchivo = upload.single('uploadedPdf'); // 'archivo' es el nombre del campo del formulario

// Endpoint POST para subir un archivo
export const subirArchivoPost = (req, res) => {
    // req.file contiene la información del archivo subido
    const archivo = req.file;
    if (!archivo) {
        return res.status(400).send('No se ha seleccionado ningún archivo.');
    }
    // Puedes hacer cualquier procesamiento adicional aquí
    res.json([{ mensaje: 'Archivo subido exitosamente', nombre: archivo.filename }]);
};

export const borrarArchivo = (req, res) => {
    const archivo = req.params.nombreArchivo;
    const dirDestination = path.join(__dirname, directorio);
    // Ruta completa del archivo
    const rutaArchivo = path.join(dirDestination, '/' + archivo);
    let responde = res
    if (fs.existsSync(rutaArchivo)) {
        fs.unlinkSync(rutaArchivo);
        responde = res.json([{ mensaje: `Archivo '${archivo}' eliminado correctamente.`, nombre: archivo }]);
    } else {
        responde = res.status(404).json([{ mensaje: `El archivo '${archivo}' no existe.` }]);
    }
    return responde
};

export const descargarArchivo = (req, res) => {
    const archivo = req.params.nombreArchivo;
    const dirDestination = path.join(__dirname, directorio);
    // Ruta completa del archivo
    const rutaArchivo = path.join(dirDestination, '/' + archivo);
    let response = res
    if (fs.existsSync(rutaArchivo)) {
        response = res.download(rutaArchivo, archivo);
    } else {
        response = res.status(404).json([{ mensaje: `El archivo '${archivo}' no existe.` }]);
    }
    return response
};

export const getLinkArchivo = (req, res) => {

    return res
};