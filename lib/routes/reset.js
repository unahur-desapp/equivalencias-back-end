import express from 'express';
import {
    postReset,
    updatePassword,
} from '../controllers/reset_controller';
import { withErrorHandling } from './utils';

const router = express.Router();

router.post('/:dni', withErrorHandling(postReset));
router.post('/', withErrorHandling(updatePassword));

export default router;