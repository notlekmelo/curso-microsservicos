import { Request, Response } from "express";
import { ErrorHTTP, ResponseHTTP } from "../../../../infra/server/server";
import { BuscarVendasProdutosService } from "./buscarVendasProdutos.service";

export class BuscarVendasProdutosController {
    constructor (private buscarVendasProdutosService: BuscarVendasProdutosService) { }

    async guia(req: Request, res: Response) {
        const response: ResponseHTTP = {
            status: 200,
            erro: null,
            data: null
        }
        try {
            const usuario = await this.buscarVendasProdutosService.executar(Number(req.query.token), Number(req.params.codigoProduto));
            if (usuario) {
                response.data = usuario;
            }
        }
        catch (err) {
            if (err instanceof ErrorHTTP) {
                response.status = err.status,
                response.erro = err.mensagem
            }
            else {
                response.status = 400,
                response.erro = 'Erro ao processar a requisição.'
            }
        }
        finally {
            res.status(response.status).send(response)
        }
    }

    validador(codigoUsuario: number) {
        if(!codigoUsuario || Number.isNaN(codigoUsuario)) {
            const erro = new ErrorHTTP(422, 'É obrigatório o envio do código do usuário como um número.');
            throw erro;
        }
    }
}