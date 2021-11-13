import { Router } from 'express';
import { authUser, createUser } from '../controller/users';

const router = Router();

router.post( '/register', createUser );
router.post( '/auth',     authUser );

export default router;