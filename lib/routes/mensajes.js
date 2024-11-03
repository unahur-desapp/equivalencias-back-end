import express from 'express';

import {
    getChat,
    addMensaje,
    updateMensaje,
    deleteMensaje,
} from '../controllers/mensajes_controller';

import { withErrorHandling } from './utils';


const router = express.Router();

router.get('/:id', withErrorHandling(getChat));
router.post('/', withErrorHandling(addMensaje));
router.put('/', withErrorHandling(updateMensaje));
router.delete('/:id', withErrorHandling(deleteMensaje));

export default router;