import { ErrorHTTP } from "../../../../infra/server/server";
import { VendasRepository } from "../../repositorio/vendas.repository";

export class BuscarVendasProdutosService {
    constructor(private repository: VendasRepository) {}

    async executar(codigoUsuario: number, codigoProduto: number): Promise<any> {
        const vendas = await this.repository.findByProduto(codigoUsuario, codigoProduto)
        return vendas.map((venda) => {
            return venda.id
        })
    }
}