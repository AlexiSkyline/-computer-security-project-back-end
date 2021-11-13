import { DataTypes, Model } from "sequelize";
import db from "../database/connection";

interface TextsIntance extends Model {
    userencrytedTextName: string;
    algorithm: string;
    idCreador: number;
}

const Text = db.define<TextsIntance>( 'Text', {
    encrytedText: {
        type: DataTypes.STRING
    },
    algorithm: {
        type: DataTypes.STRING
    },
    idCreator: {
        type: DataTypes.BIGINT
    },
});

export default Text;