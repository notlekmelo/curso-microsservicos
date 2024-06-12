import { ErrorHTTP } from "../../../infra/server/server";
import { Usuario } from '../entidades/usuario';
import User from '../entidades/usuario';
import { Sequelize, where } from 'sequelize';
import { NOT } from 'sequelize/types/deferrable';
import sequelize from 'sequelize';

export class UsuarioRepository {
    async fazerLogin(usuario: string) {
        const result: any = await User.findOne({
            where: {
                "Usuario": usuario
            }
        })
        if (result) {
            return {
                Nome: result.Nome,
                CodigoUsuario: result.CodigoUsuario,
                Senha: result.Senha,
            }
        }
        else {
            throw new ErrorHTTP(400, 'Não foi encontrado nenhum usuário com os dados informados.');
        }
    }

    async salvar(data: Usuario) {
        try {
            let newUser = await User.create({
                Nome: data.Nome,
                CPF: data.CPF || null,
                Senha: data.Senha,
                Usuario: data.Usuario
            })
            return newUser
        } catch (err) {
            throw new ErrorHTTP(500, 'Não foi possível gravar o usuário no banco de dados.');
        }
    }

    async buscar(filtros?: string, columns?: string, metaData?: any) {
        // TODO passar o columns como attributes e metadata
        if (filtros) {
            let camposFiltrados = filtros?.split(';');
            let where: any = {};
            for (let campo of camposFiltrados) {
                let item = campo.split('=');
                where[item[0]] =  item[0] == 'CodigoUsuario' ? (item[1].includes('NOT') ? { [sequelize.Op.not]: Number(item[1].substring(item[1].indexOf('(')+1, item[1].length-1))}  : Number(item[1])) : item[1]
            }
            const users = await User.findAll({
                where,
                offset: metaData ? (metaData.page - 1) * metaData.limit : undefined, 
                limit: metaData ? metaData.limit : undefined,
            })
            return users
        }
        else {
            return await User.findAll({
                offset: metaData ? (metaData.page - 1) * metaData.limit : undefined, 
                limit: metaData ? metaData.limit : undefined,
            })
        }
    }
    
    async atualizar(campos: any) {
        const codigo = campos.CodigoUsuario
        delete campos.CodigoUsuario;
        const usuarioAtualizado = await User.update(
            campos, {
            where: {
                "CodigoUsuario": codigo
            }
        })
        return usuarioAtualizado
    }

    async excluir(CodigoUsuario: number){
        return User.destroy({
            where: {
                "CodigoUsuario": CodigoUsuario
            }
        })
    }
}