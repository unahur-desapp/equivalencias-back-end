import express from 'express';

import {
  index,
  show,
  addEstado,
  updateEstado,
  deleteEstado,
} from '../controllers/estado_controller';
import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(show));

router.post('/', withErrorHandling(addEstado));

router.put('/:id', withErrorHandling(updateEstado));

router.delete('/:id', withErrorHandling(deleteEstado));

export default router;
