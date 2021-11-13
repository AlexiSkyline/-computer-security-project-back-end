import { Request, Response } from 'express';
import User from '../models/user';
import bcryptjs from 'bcryptjs';

export const createUser = async ( req: Request, res: Response ) => {
    const { user_name, email, password, rol, createdAt, updatedAt } = req.body;
    
    try {
        const existsEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if( existsEmail ) {
            return res.status( 400 ).json({
                msg: `Ya existe un usuario con el email ${ email }`
            });
        }

        const passwordHash = await bcryptjs.hash( password, 8 );
        
        const newUser = User.build({ user_name, email, password: passwordHash, rol, createdAt, updatedAt });
        await newUser.save();

        res.json( newUser );
    } catch (error) {
        console.log( error );
        res.json({
            msg: 'Hable con el administrador'
        });
    }
}

export const authUser = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;

    const existsEmail = await User.findOne({ where: { email } });

    if( !( await bcryptjs.compare( password, existsEmail!.password ) ) )  {
        res.json({
            msg: 'No coinciden',
         });
    } 
    
    res.json({
       infoUser: existsEmail,
    });
}