import express from "express";
import routes from "./routes";
import * as dotenv from "dotenv";

export interface ResponseHTTP {
  status: number,
  erro: any,
  data: any
}

export class ErrorHTTP {
  constructor(status: number, mensagem: string){
    this.status = status;
    this.mensagem = mensagem;
  }
  public status: number = 400;
  public mensagem: string = '';
}

const server = express();

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, DELETE');
    next();
  });
dotenv.config();
server.use(express.json());
server.use(routes);

export default server;