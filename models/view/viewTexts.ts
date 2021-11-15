import { DataTypes, Model } from "sequelize";
import db from "../../database/connection";

interface ViewTextIntance extends Model {
    encrytedText: string;
    algorithm: string;
    Creador: string;
    state: boolean;
}

const viewText = db.define<ViewTextIntance>( 'vwText', {
    encrytedText: {
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

export default viewText;