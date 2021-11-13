import { Sequelize } from 'sequelize';

const db = new Sequelize( 'projectcomputersecurity', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;