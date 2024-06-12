import { UsuarioRepository } from "../../repositorio/usuario.repository";
import { CadastrarUsuarioController } from "./cadastrarUsuario.controller";
import { CadastrarUsuarioService } from "./cadastrarUsuario.service";

const usuarioRepository = new UsuarioRepository();
const cadastrarUsuarioService = new CadastrarUsuarioService(
    usuarioRepository,
);
const cadastrarUsuarioController = new CadastrarUsuarioController(cadastrarUsuarioService);

export {
    cadastrarUsuarioService, cadastrarUsuarioController
}