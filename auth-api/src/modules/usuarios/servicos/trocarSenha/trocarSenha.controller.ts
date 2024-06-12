import { Request, Response } from "express";
import { ErrorHTTP, ResponseHTTP } from "../../../../infra/server/server";
import { TrocarSenhaDto } from "./trocarSenha.dto";
import { TrocarSenhaService } from "./trocarSenha.service";

export class TrocarSenhaController {
    constructor(
        private trocarSenhaUseCase: TrocarSenhaService
    ){} 

    async guia(req: Request, res: Response) {
        const usuario: TrocarSenhaDto = req.body;
        const response: ResponseHTTP = {
            status: 200,
            erro: null,
            data: null
        }
        try {
            this.validador(usuario)
            const token = await this.trocarSenhaUseCase.executar(usuario, Number(req.query.token));
            if (token) {
                response.data = token;
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

    validador(login: TrocarSenhaDto) {
        if(!login.CodigoUsuario && !login.SenhaAntiga) {
            const erro = new ErrorHTTP(422, 'É obrigatório o envio da senha antiga ou so código do usuário.');
            throw erro;
        }
        else if (!login.NovaSenha) {
            const erro = new ErrorHTTP(422, 'A nova senha é obrigatória.');
            throw erro;
        } 
        else if (login.SenhaAntiga && typeof login.SenhaAntiga != 'string') {
            const erro = new ErrorHTTP(422, 'A senha antiga deve ser uma cadeia de caracteres.');
            throw erro;
        }
        else if (typeof login.NovaSenha != 'string') {
            const erro = new ErrorHTTP(422, 'A nova senha deve ser uma cadeia de caracteres.');
            throw erro;
        }
    }
}