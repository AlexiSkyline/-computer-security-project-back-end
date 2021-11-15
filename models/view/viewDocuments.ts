import { DataTypes, Model } from "sequelize";
import db from "../../database/connection";

interface ViewDocumentsIntance extends Model {
    encrytedDocument: string;
    algorithm: string;
    Creador: string;
    state: boolean;
}

const viewDocument = db.define<ViewDocumentsIntance>( 'vwDocument', {
    encrytedDocument: {
        type: DataTypes.STRING
    },
    algorithm: {
        type: DataTypes.STRING
    },
    Creator: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN
    }
});

export default viewDocument;