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
  getEquivalenciasGeneral,
  addEquivalencia,
  updateEquivalencia,
} from '../controllers/equivalencia_controller';
import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/solicitada', withErrorHandling(getEquivalenciasSolicitadas));
router.get('/estado', withErrorHandling(getEquivalenciaEstado));
router.get('/aprobada', withErrorHandling(getEquivalenciaMatAprobadas));

router.get('/solicitada/:id', withErrorHandling(getEquivalenciaSolicitadaID));
router.get('/aprobada/:id', withErrorHandling(getEquivalenciaAprobadaID));
router.get('/estado/:id', withErrorHandling(getEquivalenciaEstadoID));

router.get('/general', withErrorHandling(getEquivalenciasGeneral));

router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(show));

router.post('/', withErrorHandling(addEquivalencia));

router.put('/:id', withErrorHandling(updateEquivalencia));

export default router;
