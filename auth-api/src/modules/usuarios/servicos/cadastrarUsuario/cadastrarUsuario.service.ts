import { removeMascaraCPF } from "../../../../infra/rotinas";
import { ErrorHTTP } from "../../../../infra/server/server";
import { Usuario } from "../../entidades/usuario";
import { UsuarioRepository } from "../../repositorio/usuario.repository";
import * as argon2 from "argon2"

export class CadastrarUsuarioService {
    constructor(
        private repository: UsuarioRepository,
    ) {}

    async executar(data: Usuario): Promise<any> {
        // Verifica se algum outro usuário já está usando o login
        const loginExistente: any = (await this.repository.buscar(`Usuario=${data.Usuario}`));
        if (loginExistente.length) {
            throw new ErrorHTTP(400, 'O login informado já está sendo utilizado por outro usuário.')
        }

        data.Senha = await argon2.hash(data.Senha!);
        data.CPF = removeMascaraCPF(data.CPF);

        const insertId: any = await this.repository.salvar(data)
        return {
            CodigoUsuario: insertId.CodigoUsuario
        };
    }
}