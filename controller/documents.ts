import { Request, Response } from 'express';

export const getDocuments = ( req: Request, res: Response ) => {
    res.json({
        msg: 'getDocuments',
    });
}

export const addDocument = ( req: Request, res: Response ) => {
    const { body } = req;

    res.json({
        msg: 'addDocument',
        body: body
    });
}

export const deleteDocument = ( req: Request, res: Response ) => {
    const { body } = req;

    res.json({
        msg: 'deleteDocument',
        body: body
    });
}