import express from 'express';
const controllers = require('../controllers/materia_aprobada_controller');

import {
  index,
  show,
  createMateriaAprobada,
  updateMateriaAprobada,
  deleteMateriaAprobada,
  updateArchivoMateriaAprobada,
  busquedaEquivalencias,
} from '../controllers/materia_aprobada_controller';
import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/', withErrorHandling(index));
router.get('/:id', withErrorHandling(show));
router.get('/universidad/:id', withErrorHandling(busquedaEquivalencias));

router.post('/', withErrorHandling(createMateriaAprobada));

router.put('/:id', withErrorHandling(updateMateriaAprobada));

router.delete('/:id', withErrorHandling(deleteMateriaAprobada));

router.post('/up', controllers.upload, controllers.uploadFile);

router.put('/archivo/:id', withErrorHandling(updateArchivoMateriaAprobada));

export default router;
