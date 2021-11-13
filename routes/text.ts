import { Router } from 'express';
import { addText, deleteText, getTexts } from '../controller/texts';

const router = Router();

router.get   ( '/:id',  getTexts );
router.post  ( '/',     addText );
router.delete( '/:id',  deleteText );

export default router;