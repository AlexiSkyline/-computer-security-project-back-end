import { Router } from 'express';
import { addDocument, deleteDocument, getDocuments } from '../controller/documents';

const router = Router();

router.get( '/', getDocuments );
router.post( '/', addDocument );
router.delete( '/:id', deleteDocument );

export default router;