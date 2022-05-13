import express from 'express';

import {
  index,
  show,
  getEquivalenciasSolicitadas,
  getEquivalenciaAprobadaID,
  getEquivalenciaMatAprobadas,
  getEquivalenciaSolicitadaID,
  getEquivalenciasGeneral,
  addEquivalencia,
  createEquivalencia,
  createEquivalenciax3,
  updateEquivalencia,
  deleteEquivalencia,
} from '../controllers/equivalencia_controller';
import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/solicitada', withErrorHandling(getEquivalenciasSolicitadas));

router.get('/aprobada', withErrorHandling(getEquivalenciaMatAprobadas));

router.get('/solicitada/:id', withErrorHandling(getEquivalenciaSolicitadaID));
router.get('/aprobada/:id', withErrorHandling(getEquivalenciaAprobadaID));

router.get('/general', withErrorHandling(getEquivalenciasGeneral));

router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(show));

router.post('/', withErrorHandling(addEquivalencia));

router.post('/createx2', withErrorHandling(createEquivalencia));

router.post('/createx3', withErrorHandling(createEquivalenciax3));

router.put('/:id', withErrorHandling(updateEquivalencia));

router.delete('/:id', withErrorHandling(deleteEquivalencia));

export default router;
