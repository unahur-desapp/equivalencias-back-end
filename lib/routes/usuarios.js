import express from 'express';

import {
  getTodosLosUsuarios,
  getUsuario,
  index,
  show,
} from '../controllers/usuario_controller';
import { withErrorHandling } from './utils';

const router = express.Router();
router.get('/todos', withErrorHandling(getTodosLosUsuarios));
router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(getUsuario));
router.get('/:id', withErrorHandling(show));

export default router;
