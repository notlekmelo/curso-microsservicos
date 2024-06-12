import { ErrorHTTP } from "../../../../infra/server/server";
import { ConferirEstoqueService } from "../../../integracoes/api-produtos/servicos/conferirEstoque/conferirEstoque.service";
import { IPedido } from "../../entidades/pedidos";
import { enviaUpdateProdutoEstoqueMessage } from "../../rabbitmq/ProdutoEstoqueSender";
import { VendasRepository } from "../../repositorio/vendas.repository";

export class SalvarVendaService {
    constructor(
        private repository: VendasRepository,
        private conferirEstoqueService: ConferirEstoqueService
    ) {}

    async executar(data: IPedido, token: string): Promise<any> {
        try {
            data.InseridoEm = new Date();
            data.Status = 'Pendente';

            await this.conferirEstoqueService.executar(data.Produtos, token)
            const novoPedido = await this.repository.salvar(data);
        
            enviaUpdateProdutoEstoqueMessage(novoPedido.Produtos, novoPedido.id);
            return novoPedido;
        } catch (err) {
            throw err;
        }
    }
}   