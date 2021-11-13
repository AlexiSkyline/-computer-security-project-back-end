import { Request, Response } from 'express';
import Text from '../models/texts';
import User from '../models/user';

export const addText = async ( req: Request, res: Response ) => {
    const { idCreator } = req.body;
    const { body } = req;
    
    const existsCreator = await User.findOne({ where: idCreator }); 

    if( !existsCreator ) {
        return res.status( 404 ).json({
            msg: 'El usuario no existe',
        });
    }
    const newText = Text.build( body );
    newText.save();

    res.json({
        msg: 'addText',
    });
}

export const deleteText = ( req: Request, res: Response ) => {
    const { body } = req;

    res.json({
        msg: 'deleteText',
        body: body
    });
}