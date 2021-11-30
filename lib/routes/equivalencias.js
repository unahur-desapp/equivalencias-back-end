import express from 'express';

import {
  index,
  show,
  getEquivalenciaEstado,
  getEquivalenciasSolicitadas,
  getEquivalenciaAprobadaID,
  getEquivalenciaMatAprobadas,
  getEquivalenciaEstadoID,
  getEquivalenciaSolicitadaID,
  addEquivalencia,
} from '../controllers/equivalencia_controller';
import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/solicitada', withErrorHandling(getEquivalenciasSolicitadas));
router.get('/estado', withErrorHandling(getEquivalenciaEstado));
router.get('/aprobada', withErrorHandling(getEquivalenciaMatAprobadas));

router.get('/solicitada/:id', withErrorHandling(getEquivalenciaSolicitadaID));
router.get('/aprobada/:id', withErrorHandling(getEquivalenciaAprobadaID));
router.get('/estado/:id', withErrorHandling(getEquivalenciaEstadoID));

router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(show));

router.post('/', withErrorHandling(addEquivalencia));

export default router;
