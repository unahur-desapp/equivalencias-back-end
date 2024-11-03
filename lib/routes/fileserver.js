const express = require('express');
const router = express.Router();

import {
  subirArchivo, subirArchivoPost, borrarArchivo, descargarArchivo, getLinkArchivo,
} from '../controllers/fileserver_controller';

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const MIMETYPES = ['application/pdf'];


router.post('/', subirArchivo, subirArchivoPost);

// probar API => localhost:3001/api/archivos/borrar/1694754150046.pdf
router.delete('/:nombreArchivo', borrarArchivo);

// probar API => localhost:3001/api/archivos/1694754150046.pdf
router.get('/:nombreArchivo', descargarArchivo);

// probar API => localhost:3001/api/archivos/get/1694754150046.pdf
router.get('/get/:nombreArchivo', getLinkArchivo);

/*
const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, directorio),
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = file.originalname.split(fileExtension)[0];
    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
  },
});

const fileUpload = multer({
  storage: diskstorage,
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Solo se permiten archivos ${MIMETYPES.join('')}`));
  },
  limits: {
    fieldSize: 10000000,
  },
}).single('archivopdf');


router.post('/', fileUpload, (req, res) => {
  console.log('Datos del archivo guardado');
  console.log(req.file);
  res.send(
    //Nombre del archivo
    req.file.path.substring(
      req.file.path.lastIndexOf('\\') + 1,
      req.file.path.length
    )
  );
});


router.get('/todos', (req, res) => {
  const archivos = fs.readdirSync(path.join(__dirname, directorio));
  res.json(archivos);
});

router.get('/:id', (req, res) => {
  const archivos = fs.readdirSync(path.join(__dirname, directorio));
  const archivo = archivos.find(
    (nombreArchivo) => req.params.id === nombreArchivo
  );
  res.json(archivo);
});

router.delete('/:id', (req, res) => {
  fs.unlinkSync(path.join(__dirname, directorio + '/' + req.params.id));
  console.log('Se borró el archivo' + req.params.id);
  res.send(req.params.id);
});
*/
export default router;