import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const dbName = process.env.DBNAME || '';
const dbUser = process.env.DBUSER || '';
const dbPass = process.env.DBPASS;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: process.env.DBHOST,
  dialect: "postgres",
  quoteIdentifiers: false,
  define: {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
});


sequelize.authenticate().then(() => {
  console.info("Database is connected ... nn");
}).catch(() => {
  console.error("Error connecting database ... nn");
})
  

export default sequelize;