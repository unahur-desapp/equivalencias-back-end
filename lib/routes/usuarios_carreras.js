import express from 'express';

import {
  getUsuario_carrera,
  getTodosLosUsuarios_carrera,
  addUsuarios_carrera,
  updateUsuario_carrera,
  deleteUsuario_carrera,
  getEquivalenciaCarreraDirectivo,
  getEquivalenciaCarreraSuperUsuario,
} from '../controllers/usuario_carrera_controller';
import { withErrorHandling } from './utils';

const router = express.Router();
router.get(
  '/directivo/:id',
  withErrorHandling(getEquivalenciaCarreraDirectivo)
);
router.get(
  '/superusuario',
  withErrorHandling(getEquivalenciaCarreraSuperUsuario)
);
router.get('/todas', withErrorHandling(getTodosLosUsuarios_carrera));
router.get('/:id', withErrorHandling(getUsuario_carrera));
router.post('/', withErrorHandling(addUsuarios_carrera));
router.put('/:id', withErrorHandling(updateUsuario_carrera));
router.delete('/:id', withErrorHandling(deleteUsuario_carrera));

export default router;
