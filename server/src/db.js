import { Sequelize } from 'sequelize';

// todo: redesign by dev/prod mode

// const sequelize = new Sequelize(process.env.DATABASE_URL);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
);

export default sequelize;
