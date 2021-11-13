import { Request, Response } from 'express';
import Text from '../models/texts';
import User from '../models/user';

export const getTexts = async ( req: Request, res: Response ) => {
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
        const texts = await Text.findAll();

        res.json({ texts });
    } catch (error) {
        res.status( 404 ).json({ msg: 'Hubo un error en el Servidor' });
    }
}

export const addText = async ( req: Request, res: Response ) => {
    const { body }      = req;
    const { idCreator } = req.body;
    
    const existsCreator = await User.findByPk( idCreator ); 

    if( !existsCreator ) {
        return res.status( 404 ).json({
            msg: 'El usuario no existe',
        });
    }

    const existsText = Text.build( body );
    existsText.save();

    res.json({
        msg: 'El texto ha sido aagregado correctamente',
        text: existsText
    });
}

export const deleteText = async ( req: Request, res: Response ) => {
    const { id  }       = req.params;
    const { idCreator } = req.body;

    try {    
        const existsText    = await Text.findByPk( id );    
        const existsCreator = await User.findOne({ where: idCreator }); 

        if( !existsCreator ) {
            return res.status( 403 ).json({
                msg: 'El usuario no existe',
            });
        } else if( !existsText ) {
            return res.status( 404 ).json({
                msg: 'Error el texto ya ha sido eliminado',
            });
        }

        await existsText.update({ state: false });

        res.json({
            msg: 'El texto ha sido eliminado correctamente',
            Text: existsText
        });
    } catch (error) {
        res.status( 404 ).json({
            msg: 'Error en el servidor',
        });
    }
}