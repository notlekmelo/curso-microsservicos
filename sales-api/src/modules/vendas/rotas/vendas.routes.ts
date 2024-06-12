import express, { Request, Response, Router } from "express";
import * as token from '../../../infra/server/token'
import { buscarVendasController } from "../servicos/buscarVendas";
import { salvarVendaController } from "../servicos/salvarVenda";
import { buscarVendasProdutosController } from "../servicos/buscarVendasProdutos";

const routes = express.Router();

routes.get('/', token.ValidaToken, async (req: Request, res: Response) => {
    return buscarVendasController.guia(req,res);
});

routes.get('/produto/:codigoProduto', token.ValidaToken, async (req: Request, res: Response) => {
    return buscarVendasProdutosController.guia(req,res);
});

routes.post('/', token.ValidaToken, async (req: Request, res: Response) => {
    return salvarVendaController.guia(req,res);
});

module.exports = (app: Router) => {
    app.use('/vendas', routes)
}