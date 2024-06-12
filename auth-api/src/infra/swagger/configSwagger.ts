import { atualizarUsuarioPath } from "../../modules/usuarios/servicos/atualizarUsuario/atualizarUsuario.swagger";
import { cadastrarUsuarioDefinitions, cadastrarUsuarioPath } from "../../modules/usuarios/servicos/cadastrarUsuario/cadastrarUsuario.swagger";
import { deletarUsuarioPath } from "../../modules/usuarios/servicos/deletarUsuario/deletarUsuario.swagger";
import { fazerLoginDefinitions, fazerLoginPath } from "../../modules/usuarios/servicos/fazerLogin/fazerLogin.swagger";
import { trocarSenhaUsuarioDefinitions, trocarSenhaUsuarioPath } from "../../modules/usuarios/servicos/trocarSenha/trocarSenha.swagger";
import retornosPadraoDefinitions from "./retornosPadrao.swagger";

const tags = [
    {name: 'Usuário'},
];
const pathsDefindos = [
    fazerLoginPath,
    atualizarUsuarioPath,
    cadastrarUsuarioPath,
    deletarUsuarioPath,
    trocarSenhaUsuarioPath,
];
const definitionsDefinidas = [
    retornosPadraoDefinitions,
    fazerLoginDefinitions,
    cadastrarUsuarioDefinitions,
    trocarSenhaUsuarioDefinitions,
];

const paths = {};

for (let item of pathsDefindos) {
    for (let prop in item) {
        // @ts-ignore
        if (paths.hasOwnProperty(prop)) Object.assign(paths[prop], item[prop]);
        // @ts-ignore
        else paths[prop] = item[prop];
    }
}

const definitions = {};

for (let item of definitionsDefinidas) {
    let objectArrayDefinitions: any = item;
    for (let definition of objectArrayDefinitions) {
        for (let prop in definition) {
            // @ts-ignore
            if (definitions.hasOwnProperty(prop)) Object.assign(definitions[prop], definition[prop]);
            // @ts-ignore
            else definitions[prop] = definition[prop];
        }
    }
}

export { definitions, paths, tags };

