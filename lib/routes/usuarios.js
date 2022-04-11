import express from 'express';

import {
  getTodosLosUsuarios,
  getUsuario,
  index,
  show,
  addUsuario,
  updateUsuario,
} from '../controllers/usuario_controller';
import { withErrorHandling } from './utils';

const router = express.Router();
router.get('/todos', withErrorHandling(getTodosLosUsuarios));
router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(getUsuario));
router.get('/:id', withErrorHandling(show));
router.post('/', withErrorHandling(addUsuario));

router.post('/', withErrorHandling(addUsuario));

router.put('/:id', withErrorHandling(updateUsuario));

export default router;
