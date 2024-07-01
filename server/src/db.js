const { Sequelize } = require('sequelize');

// module.exports = new Sequelize('postgres://postgres:root@postgresqldb:5432/web_chat');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
    },
);

module.exports = sequelize;
