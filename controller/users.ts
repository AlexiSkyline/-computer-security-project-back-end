import { Request, Response } from 'express';
import User from '../models/user';
import bcryptjs from 'bcryptjs';
import { loginSuccess, passwordError, serverErrorMessage, userCreatedSuccess, userUsed } from './messages/messages';

export const createUser = async ( req: Request, res: Response ) => {
    const { userName, email, password, rol, createdAt, updatedAt } = req.body;
    
    try {
        const existsEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if( existsEmail ) {
            res.status( 403 ).json({ msg: userUsed });
        }

        const passwordHash = await bcryptjs.hash( password, 8 );
        
        const newUser = User.build({ userName, email, password: passwordHash, rol, createdAt, updatedAt });
        await newUser.save();

        res.json({ newUser, msg: userCreatedSuccess, ruta: rol === 'admin' ? '/admin': '/'  });
    } catch (error) {
        console.log( error );
        res.status( 404 ).json({ msg: serverErrorMessage });
    }
}

export const authUser = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;

    try {
        const existsEmail = await User.findOne({ where: { email } });

        if( !( await bcryptjs.compare( password, existsEmail!.password ) ) )  {
            res.status( 403 ).json({ msg: passwordError });
        } 
        
        res.json({ infoUser: existsEmail, msg: loginSuccess, ruta: existsEmail!.rol === 'admin' ? '/admin': '/' });
    } catch (error) {
        console.log( error );
        res.status( 404 ).json({ msg: serverErrorMessage });
    }
}