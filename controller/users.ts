import { Request, Response } from 'express';

export const createUser = ( req: Request, res: Response ) => {
    const { body } = req;

    res.json({
        msg: 'postCreatedUser',
        body: body,
    });
}

export const authUser = ( req: Request, res: Response ) => {
    const { body } = req.params;
    const { email, password } = req.params;

    res.json({
       msg: 'AuthUser',
       body: body,
    });
}