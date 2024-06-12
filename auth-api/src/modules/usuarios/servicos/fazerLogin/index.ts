import { UsuarioRepository } from "../../repositorio/usuario.repository";
import { FazerLoginController } from "./fazerLogin.controller";
import { FazerLoginService } from "./fazerLogin.service";

const usuarioRepository = new UsuarioRepository();
const fazerLoginService = new FazerLoginService(usuarioRepository);
const fazerLoginController = new FazerLoginController(fazerLoginService);

export {
    fazerLoginService, fazerLoginController
}