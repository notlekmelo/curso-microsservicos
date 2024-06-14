import { ErrorHTTP } from "../../../../infra/server/server";
import { UsuarioRepository } from "../../repositorio/usuario.repository";
import { TrocarSenhaDto } from "./trocarSenha.dto";
import * as argon2 from "argon2";

export class TrocarSenhaService {
    constructor(
        private repository: UsuarioRepository
    ) {}

    async executar(data: TrocarSenhaDto, usuarioModificacao: number) {
        if (data.CodigoUsuario) {
            const usuarioExistente = await this.repository.buscar(`CodigoUsuario=${data.CodigoUsuario}`);
            if (usuarioExistente.length > 0) {
                const senha = await argon2.hash(data.NovaSenha)
                await this.repository.atualizar({CodigoUsuario: data.CodigoUsuario, ModificadoPor: usuarioModificacao, Senha: senha})
                return {
                    Atualizado: true
                }
            }
            else {
                throw new ErrorHTTP(400, 'O usuário informado não foi encontrado');
            }
        }
        else {
            const usuarioExistente: any = await this.repository.buscar(`CodigoUsuario=${usuarioModificacao}`)
            const senhaVerificada = await argon2.verify( usuarioExistente[0].Senha, data.SenhaAntiga!);
            if (senhaVerificada) {
                const senha = await argon2.hash(data.NovaSenha)
                await this.repository.atualizar({CodigoUsuario: usuarioModificacao, ModificadoPor: usuarioModificacao, Senha: senha})
                return {
                    Atualizado: true
                }
            }
            else {
                throw new ErrorHTTP(400, 'A senha informada não coincide com a antiga senha do usuário.');
            }
        }
    }
}