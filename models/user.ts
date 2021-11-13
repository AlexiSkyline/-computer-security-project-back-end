import { DataTypes } from 'sequelize';
import db from '../database/connection';

const User = db.define( 'User', {
    user_name: {
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