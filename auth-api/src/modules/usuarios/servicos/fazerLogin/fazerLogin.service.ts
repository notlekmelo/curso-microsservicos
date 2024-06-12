import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { UsuarioRepository } from "../../repositorio/usuario.repository";
import { LoginDto } from "./fazerLogin.dto";
import * as argon2 from "argon2";
import { ErrorHTTP } from "../../../../infra/server/server";

export class FazerLoginService {
    constructor(private repository: UsuarioRepository) {}

    async executar(login: LoginDto) {
        dotenv.config();

        const usuario = await this.repository.fazerLogin(login.Usuario);

        const senhaVerificada = await argon2.verify( usuario.Senha, login.Senha);
        if (senhaVerificada) {
            try {
                const token = jwt.sign({userCode: usuario.CodigoUsuario, userName: usuario.Nome}, String(process.env.SECRET), {
                    expiresIn: "15d" // Token com duração de 15 dias
                    });
                return {
                    token
                }
            }
            catch (err) {
                const message = err instanceof Error ? err.message : '';
                const erro = new ErrorHTTP(500, 'Erro ao gerar o token do usuário: ' + message);
                throw erro
            }
        }
        else {
            const erro = new ErrorHTTP(400, 'Não foi encontrado nenhum usuário com os dados informados.');
            throw erro;
        }
    }
}