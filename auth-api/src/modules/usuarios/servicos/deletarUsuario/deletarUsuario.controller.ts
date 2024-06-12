import { Request, Response } from "express";
import { ErrorHTTP, ResponseHTTP } from "../../../../infra/server/server";
import { DeletarUsuarioService } from "./deletarUsuario.service";

export class DeletarUsuarioController {
    constructor (private UsuarioService: DeletarUsuarioService) { }

    async guia(req: Request, res: Response) {
        const codigoUsuario = Number(req.query.token);
        const response: ResponseHTTP = {
            status: 200,
            erro: null,
            data: null
        }
        try {
            this.validador(codigoUsuario)
            const usuario = await this.UsuarioService.executar(codigoUsuario);
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