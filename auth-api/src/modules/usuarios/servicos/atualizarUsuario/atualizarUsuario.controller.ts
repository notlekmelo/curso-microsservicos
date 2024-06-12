import { Request, Response } from "express";
import { ErrorHTTP, ResponseHTTP } from "../../../../infra/server/server";
import { Usuario } from "../../entidades/usuario";
import { AtualizarUsuarioService } from "./atualizarUsuario.service";
import { removeMascaraCPF, validaCPF } from "../../../../infra/rotinas";

export class AtualizarUsuarioController {
    constructor (private usuarioService: AtualizarUsuarioService) { }

    async guia(req: Request, res: Response) {
        const novoUsuario: Usuario = req.body;
        novoUsuario.CodigoUsuario = Number(req.query.token);
        const response: ResponseHTTP = {
            status: 200,
            erro: null,
            data: null
        }
        try {
            this.validador(novoUsuario)
            const grupo = await this.usuarioService.executar(novoUsuario);
            if (grupo) {
                response.data = grupo;
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

    validador(user: Usuario) {
        if(!user.CodigoUsuario) {
            throw new ErrorHTTP(422, 'O código do usuário é obrigatório.');
        }
        else if (Number.isNaN(Number(user.CodigoUsuario))){
            throw new ErrorHTTP(422, 'O código do usuário deve ser um número.');
        }
        if(!user.Nome) {
            throw new ErrorHTTP(422, 'O nome do usuário é obrigatório.');
        }
        else if (user.Nome.length > 100) {
            throw new ErrorHTTP(422, 'O nome do usuário deve conter no máximo 100 caracteres.');
        }
        else if (!user.Usuario) { 
            throw new ErrorHTTP(422, 'O campo usuário é obrigatório.');
        }
        else if (user.Usuario.length > 15) {
            throw new ErrorHTTP(422, 'O campo usuário deve conter no máximo 15 caracteres.');
        }
        if (user.CPF) {
            if(removeMascaraCPF(user.CPF).length != 11) {
                throw new ErrorHTTP(422, 'O campo CPF deve conter 11 caracteres.');
            }
            else if (!validaCPF(user.CPF)) {
                throw new ErrorHTTP(422, 'O CPF digitádo é inválido.');
            }
        }
    }
}