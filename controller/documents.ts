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
    const { body }      = req;
    
    const existsCreator = await User.findByPk( idCreator ); 

    if( !existsCreator ) {
        return res.status( 404 ).json({
            msg: 'El usuario no existe',
        });
    }

    const newDocument = Document.build( body );
    newDocument.save();

    res.json({
        msg: 'El documento ha sido aagregado correctamente',
        text: newDocument
    });
}

export const deleteDocument = async ( req: Request, res: Response ) => {
    const { id  }       = req.params;
    const { idCreator } = req.body;

    try {    
        const existsDocument    = await Document.findByPk( id );    
        const existsCreator     = await User.findOne({ where: idCreator }); 

        if( !existsCreator ) {
            return res.status( 403 ).json({
                msg: 'El usuario no existe',
            });
        } else if( !existsDocument ) {
            return res.status( 404 ).json({
                msg: 'Error el documento ya ha sido eliminado',
            });
        }

        await existsDocument.update({ state: false });

        res.json({
            msg: 'El documento ha sido eliminado correctamente',
            Text: existsDocument
        });
    } catch (error) {
        res.status( 404 ).json({
            msg: 'Error en el servidor',
        });
    }
}