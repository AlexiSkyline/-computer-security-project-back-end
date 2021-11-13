import { Request, Response } from 'express';

export const getTexts = ( req: Request, res: Response ) => {
    res.json({
        msg: 'getTexts',
    });
}

export const addText = ( req: Request, res: Response ) => {
    const { body } = req;

    res.json({
        msg: 'addText',
        body: body
    });
}

export const deleteText = ( req: Request, res: Response ) => {
    const { body } = req;

    res.json({
        msg: 'deleteText',
        body: body
    });
}