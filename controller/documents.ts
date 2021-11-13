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

