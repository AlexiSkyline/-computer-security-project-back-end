import { Router } from 'express';
import { addDocument, deleteDocument, getDocuments } from '../controller/documents';

const router = Router();

router.get   ( '/:id',      getDocuments );
router.post  ( '/',      addDocument );
router.delete( '/:id',   deleteDocument );

export default router;