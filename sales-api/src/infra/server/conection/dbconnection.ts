import mongoose from "mongoose";

const dbName = process.env.DBNAME || 'sales-db';
const dbHost = process.env.DBHOST || 'localhost';
const dbPort = process.env.DBPORT || '27017';
const dbUser = process.env.DBUSER || 'admin';
const dbPass = process.env.DBPASS || '123456';

const mongoURL = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}`;

export default function connectMongo() {
  mongoose.connect(mongoURL);
  mongoose.connection.on('connected', function ()  {
    console.info("Database is connected ... nn");
  })
  mongoose.connection.on('error', function ()  {
    console.error("Error connecting database ... nn");
  })
}