import { UsuarioRepository } from "../../repositorio/usuario.repository";
import { AtualizarUsuarioController } from "./atualizarUsuario.controller";
import { AtualizarUsuarioService } from "./atualizarUsuario.service";

const usuarioRepository = new UsuarioRepository();
const atualizarUsuarioService = new AtualizarUsuarioService(
    usuarioRepository,
);
const atualizarUsuarioController = new AtualizarUsuarioController(atualizarUsuarioService);

export {
    atualizarUsuarioService, atualizarUsuarioController
}