import { Request, Response } from "express";
import { ErrorHTTP, ResponseHTTP } from "../../../../infra/server/server";
import { SalvarVendaService } from "./salvarVenda.service";
import { IPedido } from "../../entidades/pedidos";

export class SalvarVendaController {
    constructor (private salvarVendaService: SalvarVendaService) { }

    async guia(req: Request, res: Response) {
        const data = req.body as IPedido;
        const token = req.headers['x-access-token'];
        data.InseridoPor = {
            CodigoUsuario: req.query.token,
            Nome: req.query.userName
        };
        const response: ResponseHTTP = {
            status: 200,
            erro: null,
            data: null
        }
        try {
            this.validador(data);
            const usuario = await this.salvarVendaService.executar(data, String(token));
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

    validador(data: IPedido) {
        if (!data.Produtos || data.Produtos.length == 0) {
            const erro = new ErrorHTTP(422, 'É obrigatório o envio dos produtos do pedido.');
            throw erro;
        }
        else {
            for (let produto of data.Produtos) {
                if (!produto.codigoProduto || Number.isNaN(data.ValorTotal) || produto.codigoProduto <= 0) {
                    const erro = new ErrorHTTP(422, 'Os produtos devem ter o código do produto');
                    throw erro;
                }
                if (!produto.quantidade || Number.isNaN(data.ValorTotal) || produto.quantidade <= 0) {
                    const erro = new ErrorHTTP(422, 'Os produtos devem possuir quantidade maior que zero.');
                    throw erro;
                }
            }
        }
        if(!data.ValorTotal || Number.isNaN(data.ValorTotal) || data.ValorTotal <= 0) {
            const erro = new ErrorHTTP(422, 'É obrigatório o envio do valor total como um número positivo.');
            throw erro;
        }
    }
}