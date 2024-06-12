import  Sequelize from "sequelize";
import sequelize from "../../../infra/server/conection/dbconnection";

const User = sequelize.define('Usuarios', {
    CodigoUsuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    CPF: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Usuario: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Senha: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
})

export interface Usuario {
    CodigoUsuario?: number;
    Nome: string;
    CPF: string;
    Usuario: string;
    Senha?: string;
}

export default User;