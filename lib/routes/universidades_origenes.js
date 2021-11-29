import express from 'express';

import {
  getUniversidadOrigenTodas,
  getUniversidadOrigen,
  index,
  show,
} from '../controllers/universidad_origen_controller';
import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/todas', withErrorHandling(getUniversidadOrigenTodas));
router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(getUniversidadOrigen));
router.get('/:id', withErrorHandling(show));

export default router;
