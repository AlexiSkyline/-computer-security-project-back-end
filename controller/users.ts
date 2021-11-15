import { Request, Response } from 'express';
import User from '../models/user';
import bcryptjs from 'bcryptjs';
import { loginSuccess, passwordOrEmailError, serverErrorMessage, userCreatedSuccess, userUsed } from './messages/messages';

export const createUser = async ( req: Request, res: Response ) => {
    const { userName, email, password, rol, createdAt, updatedAt } = req.body;
    
    try {
        const existsEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if( existsEmail ) {
            return res.status( 403 ).json({ msg: userUsed });
        }

        const passwordHash = await bcryptjs.hash( password, 8 );
        
        const newUser = User.build({ userName, email, password: passwordHash, rol, createdAt, updatedAt });
        await newUser.save();

        res.json({ newUser, msg: userCreatedSuccess, ruta: rol === 'desencriptador' ? 'admin.html': 'index.html'  });
    } catch (error) {
        console.log( error );
        res.status( 404 ).json({ msg: serverErrorMessage });
    }
}

export const authUser = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;

    try {
        const existsEmail = await User.findOne({ where: { email } });

        if ( !existsEmail ) {
            return res.status( 404 ).json({ msg: passwordOrEmailError });
        } else if( !( await bcryptjs.compare( password, existsEmail!.password ) ) )  {
            return res.status( 403 ).json({ msg: passwordOrEmailError });
        } 
        
        res.json({ infoUser: existsEmail, msg: loginSuccess, ruta: existsEmail!.rol === 'desencriptador' ? 'admin.html': 'index.html' });
    } catch (error) {
        console.log( error );
        res.status( 404 ).json({ msg: serverErrorMessage });
    }
}