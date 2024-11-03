import express from 'express';
import usuarios from './usuarios';
import equivalencias from './equivalencias';
import materias_aprobadas from './materias_aprobadas';
import universidades_origenes from './universidades_origenes';
import materias_solicitadas from './materias_solicitadas';
import fileserver from './fileserver';
import carreras from './carreras';
import usuarios_carreras from './usuarios_carreras';
import mensajes from './mensajes';
import googleapi from './googleapi';
import reset from './reset';

const router = express.Router();

router.use('/api/usuarios', usuarios);
router.use('/api/equivalencias', equivalencias);

router.use('/api/materias_aprobadas', materias_aprobadas);
router.use('/api/universidades_origenes', universidades_origenes);
router.use('/api/materias_solicitadas', materias_solicitadas);

router.use('/api/archivos', fileserver);
//router.use('/api/archivos', googleapi);

router.use('/api/carreras', carreras);
router.use('/api/usuarios_carreras', usuarios_carreras);
router.use('/api/mensajes', mensajes);
router.use('/api/reset', reset);

export default router;
