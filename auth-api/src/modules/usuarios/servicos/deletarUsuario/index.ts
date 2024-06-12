import { UsuarioRepository } from "../../repositorio/usuario.repository";
import { DeletarUsuarioController } from "./deletarUsuario.controller";
import { DeletarUsuarioService } from "./deletarUsuario.service";

const usuarioRepository = new UsuarioRepository();
const deletarUsuarioService = new DeletarUsuarioService(usuarioRepository);
const deletarUsuarioController = new DeletarUsuarioController(deletarUsuarioService);

export {
    deletarUsuarioService, deletarUsuarioController
}