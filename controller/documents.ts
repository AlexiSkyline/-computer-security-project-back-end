import { Request, Response } from 'express';
import Document from '../models/document';
import User from '../models/user';
import { noPermits, noUserExists, deleteSuccess, serverErrorMessage, addedSuccess, alreadyDelete } from './messages/messages';

export const getDocuments = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    try {
        const existsCreator = await User.findByPk( id ); 

        if( !existsCreator ) {
            return res.status( 404 ).json({ msg: noUserExists });
        } 
        
        if ( !( existsCreator?.rol === 'admin' ) ) {
            return res.status( 403 ).json({ msg: noPermits });
        }
        
        const documents = await Document.findAll();

        res.json({ documents });
    } catch (error) {
        console.log( error );
        res.status( 404 ).json({ msg: serverErrorMessage });
    }
}

export const addDocument = async ( req: Request, res: Response ) => {
    const { idCreator } = req.body;
    const { body }      = req;
    
    try {
        
        const existsCreator = await User.findByPk( idCreator ); 
        
        if( !existsCreator ) {
            return res.status( 404 ).json({ msg: noUserExists });
        }
        
        const newDocument = Document.build( body );
        newDocument.save();
        
        res.json({ msg: addedSuccess, text: newDocument });
    } catch (error) {
        console.log( error );
        res.status( 404 ).json({ msg: serverErrorMessage });
    }
}

export const deleteDocument = async ( req: Request, res: Response ) => {
    const { id  }       = req.params;
    const { idCreator } = req.body;

    try {    
        const existsDocument    = await Document.findByPk( id );    
        const existsCreator     = await User.findOne({ where: idCreator }); 

        if( !existsCreator ) {
            return res.status( 403 ).json({ msg: noUserExists });
        } else if( !existsDocument ) {
            return res.status( 404 ).json({ msg: alreadyDelete });
        }

        await existsDocument.update({ state: false });

        res.json({
            msg: deleteSuccess,
            Text: existsDocument
        });
    } catch (error) {
        res.status( 404 ).json({
            msg: serverErrorMessage
        });
    }
}