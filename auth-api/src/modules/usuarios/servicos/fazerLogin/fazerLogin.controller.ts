import { Request, Response } from "express";
import { ErrorHTTP, ResponseHTTP } from "../../../../infra/server/server";
import { LoginDto } from "./fazerLogin.dto"
import { FazerLoginService } from "./fazerLogin.service"

export class FazerLoginController {
    constructor(private fazerLoginService: FazerLoginService) {}

    async guia(req: Request, res: Response) {
        const login = req.body;
        const response: ResponseHTTP = {
            status: 200,
            erro: null,
            data: null
        }
        try {
            this.validador(login)
            const token = await this.fazerLoginService.executar(login);
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

    validador(login: LoginDto) {
        if(!login.Usuario) {
            const erro = new ErrorHTTP(422, 'O usuário é obrigatório');
            throw erro;
        }
        else if (!login.Senha) {
            const erro = new ErrorHTTP(422, 'A senha é obrigatória.');
            throw erro;
        } 
        else if (typeof login.Senha != 'string') {
            const erro = new ErrorHTTP(422, 'A senha deve ser uma cadeia de caracteres.');
            throw erro;
        }
    }
}