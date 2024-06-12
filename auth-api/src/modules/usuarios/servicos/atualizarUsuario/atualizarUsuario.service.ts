import { removeMascaraCPF } from "../../../../infra/rotinas";
import { ErrorHTTP } from "../../../../infra/server/server";
import { Usuario } from "../../entidades/usuario";
import { UsuarioRepository } from "../../repositorio/usuario.repository";

export class AtualizarUsuarioService {
    constructor(
        private repository: UsuarioRepository,
    ) {}

    async executar(data: Usuario): Promise<any> {
        const existente: any = (await this.repository.buscar('CodigoUsuario=' + data.CodigoUsuario));
        if (existente.length == 0) {
            throw new ErrorHTTP(400, 'O usuário informado não foi encontrado.');
        }

        // Verifica se algum outro usuário já está usando o login
        const loginExistente: any = (await this.repository.buscar(`CodigoUsuario=NOT(${data.CodigoUsuario});Usuario=${data.Usuario}`));
        if (loginExistente.length) {
            throw new ErrorHTTP(400, 'O login informado já está sendo utilizado por outro usuário.')
        }

        data.CPF = removeMascaraCPF(data.CPF);

        delete data.Senha;

        await this.repository.atualizar(data)
        return {
            Atualizado: true
        };
    }

}