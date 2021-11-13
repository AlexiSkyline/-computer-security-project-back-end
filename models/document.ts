import { DataTypes, Model } from "sequelize";
import db from "../database/connection";

interface DocumentsIntance extends Model {
    encrytedDocument: string;
    algorithm: string;
    idCreador: number;
    state: boolean;
}

const Document = db.define<DocumentsIntance>( 'Document', {
    encrytedDocument: {
        type: DataTypes.STRING
    },
    algorithm: {
        type: DataTypes.STRING
    },
    idCreator: {
        type: DataTypes.BIGINT
    },
    state: {
        type: DataTypes.BOOLEAN
    }
});

export default Document;