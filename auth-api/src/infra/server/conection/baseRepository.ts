import User from "../../../modules/usuarios/entidades/usuario";


export async function createInitialData() {
    await User.sync({ force: false})
}