import { Request, Response } from 'express';
import Document from '../models/document';
import User from '../models/user';

export const getDocuments = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    try {
        const existsCreator = await User.findByPk( id ); 

        if( !existsCreator ) {
            return res.status( 404 ).json({
                msg: 'El usuario no existe',
            });
        } 
        
        if ( !( existsCreator?.rol === 'admin' ) ) {
            return res.status( 403 ).json({
                msg: 'El usuario no tiene los permisos requeridos',
            });
        }
        // console.log( existsCreator?.rol );
        const documents = await Document.findAll();

        res.json({ documents });
    } catch (error) {
        res.status( 404 ).json({ msg: 'Hubo un error en el Servidor' });
    }
}

export const addDocument = async ( req: Request, res: Response ) => {
    const { idCreator } = req.body;
    const { body } = req;
    
    const existsCreator = await User.findByPk( idCreator ); 

    if( !existsCreator ) {
        return res.status( 404 ).json({
            msg: 'El usuario no existe',
        });
    }

    const newDocument = Document.build( body );
    newDocument.save();

    res.json({
        msg: 'El texto ha sido aagregado correctamente',
        text: newDocument
    });
}

export const deleteDocument = ( req: Request, res: Response ) => {
    const { body } = req;

    res.json({
        msg: 'deleteDocument',
        body: body
    });
}