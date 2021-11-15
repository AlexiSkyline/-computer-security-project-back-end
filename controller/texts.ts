import { Request, Response } from 'express';
import Text from '../models/texts';
import User from '../models/user';
import viewText from '../models/view/viewTexts';
import { noPermits, noUserExists, deleteSuccess, serverErrorMessage, addedSuccess, alreadyDelete } from './messages/messages';

export const getTexts = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const existsCreator = await User.findByPk( id ); 

        if( !existsCreator ) {
            return res.status( 404 ).json({ msg: noUserExists });
        } 
        
        if ( !( existsCreator?.rol === 'desencriptador' ) ) {
            return res.status( 403 ).json({ msg: noPermits });
        }
        
        const texts = await viewText.findAll();

        res.json({ texts });
    } catch (error) {
        console.log( error );
        res.status( 404 ).json({ msg: serverErrorMessage });
    }
}

export const addText = async ( req: Request, res: Response ) => {
    const { body }      = req;
    const { idCreator } = req.body;
    
    try {
        
        const existsCreator = await User.findByPk( idCreator ); 
        
        if( !existsCreator ) {
            return res.status( 404 ).json({ msg: noUserExists });
        }
        
        const existsText = Text.build( body );
        existsText.save();
        
        res.json({ msg: addedSuccess, text: existsText });
    } catch (error) {
        console.log( error );
        res.status( 404 ).json({ msg: serverErrorMessage });
    }
}

export const deleteText = async ( req: Request, res: Response ) => {
    const { id  }       = req.params;
    const { idCreator } = req.body;

    try {    
        const existsText    = await Text.findByPk( id );    
        const existsCreator = await User.findOne({ where: idCreator }); 

        if( !existsCreator ) {
            return res.status( 403 ).json({ msg: noUserExists });
        } else if( !existsText ) {
            return res.status( 404 ).json({ msg: alreadyDelete });
        }

        await existsText.update({ state: false });

        res.json({
            msg: deleteSuccess,
            Text: existsText
        });
    } catch (error) {
        console.log( error );
        res.status( 404 ).json({ msg: serverErrorMessage });
    }
}