import { DataTypes, Model } from 'sequelize';
import db from '../database/connection';

interface UserIntance extends Model {
    userName: string;
    emial: string;
    password: string;
    rol: string;
}

const User = db.define<UserIntance>( 'User', {
    userName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.STRING
    }
});

export default User;