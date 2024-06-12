import { ErrorHTTP } from "../../../../infra/server/server";
import { VendasRepository } from "../../repositorio/vendas.repository";

export class BuscarVendasService {
    constructor(private repository: VendasRepository) {}

    async executar(codigoUsuario: number): Promise<any> {
        return await this.repository.buscar(codigoUsuario)
    }
}