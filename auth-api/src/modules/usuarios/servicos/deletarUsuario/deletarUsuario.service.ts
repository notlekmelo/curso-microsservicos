import { ErrorHTTP } from "../../../../infra/server/server";
import { UsuarioRepository } from "../../repositorio/usuario.repository";

export class DeletarUsuarioService {
    constructor(private repository: UsuarioRepository) {}

    async executar(codigoUsuario: number): Promise<any> {
        const existente: any = await this.repository.buscar('CodigoUsuario='+ codigoUsuario);
        if (existente.length == 0) {
            const erro = new ErrorHTTP(400, 'O usuário informado não foi encontrado.');
            throw erro;
        }

        await this.repository.excluir(codigoUsuario)
        return {
            Deletado: true
        };
    }

}