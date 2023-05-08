import express from 'express';
import {
  index,
  show,
  getEquivalenciasSolicitadas,
  getEquivalenciaAprobadaID,
  getEquivalenciaMatAprobadas,
  getEquivalenciaSolicitadaID,
  getEquivalenciasGeneral,
  getEquivalenciasGeneralID,
  addEquivalencia,
  createEquivalencia,
  createEquivalenciax3,
  updateEquivalencia,
  deleteEquivalencia,
  getEquivalenciasGeneralUsuario,
} from '../controllers/equivalencia_controller';
import { withErrorHandling } from './utils';
import { validatorCreate } from '../middlewares/validator/equivalencia';

const router = express.Router();

router.get('/solicitada', withErrorHandling(getEquivalenciasSolicitadas));
router.get('/solicitada/:id', withErrorHandling(getEquivalenciaSolicitadaID));
router.get('/aprobada', withErrorHandling(getEquivalenciaMatAprobadas));
router.get('/aprobada/:id', withErrorHandling(getEquivalenciaAprobadaID));
router.get('/general', withErrorHandling(getEquivalenciasGeneral));
router.get('/general/:id', withErrorHandling(getEquivalenciasGeneralID));
router.get(
  '/generalUsuario/:id',
  withErrorHandling(getEquivalenciasGeneralUsuario)
);
router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(show));
router.post('/', withErrorHandling(addEquivalencia));
router.post('/createx2', withErrorHandling(createEquivalencia));
router.post(
  '/createx3',
  validatorCreate,
  withErrorHandling(createEquivalenciax3)
);
router.put('/:id', withErrorHandling(updateEquivalencia));
router.delete('/:id', withErrorHandling(deleteEquivalencia));

export default router;
