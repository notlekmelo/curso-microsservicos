import express, { Request, Response, Router } from "express";
import { fazerLoginController } from "../servicos/fazerLogin";
import { cadastrarUsuarioController } from "../servicos/cadastrarUsuario";
import { atualizarUsuarioController } from "../servicos/atualizarUsuario";
import { deletarUsuarioController } from "../servicos/deletarUsuario";
import * as token from '../../../infra/server/token'

const routes = express.Router();

routes.post('/login', async (req: Request, res: Response) => {
    return fazerLoginController.guia(req,res);
});

routes.post('/', async (req: Request, res: Response) => {
    return cadastrarUsuarioController.guia(req,res);
});

routes.put('/', token.ValidaToken ,async (req: Request, res: Response) => {
    return atualizarUsuarioController.guia(req,res);
});

routes.delete('/', token.ValidaToken ,async (req: Request, res: Response) => {
    return deletarUsuarioController.guia(req,res);
});

module.exports = (app: Router) => {
    app.use('/usuario', routes)
}