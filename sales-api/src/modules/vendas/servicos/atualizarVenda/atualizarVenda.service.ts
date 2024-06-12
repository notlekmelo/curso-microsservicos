import { VendasRepository } from "../../repositorio/vendas.repository";
import { IMessageConfirmacaoVenda } from "./atualizarVenda.dto";

export class AtualizarVendaService {
    constructor(private repository: VendasRepository) {}

    async executar(data: any): Promise<any> {
        try {
            const pedido: IMessageConfirmacaoVenda = JSON.parse(data.content.toString());
            if (pedido.codigoVenda) {
                const pedidoExistente = await this.repository.findById(pedido.codigoVenda);
                if (pedidoExistente) {
                    if (pedidoExistente.Status != pedido.status) {
                        pedidoExistente.ModificadoEm = new Date();
                        pedidoExistente.Status = pedido.status
                        pedidoExistente.Observacao = pedido.mensagemErro ? pedido.mensagemErro : undefined;
                        this.repository.salvar(pedidoExistente);
                    }
                }
            }
        }
        catch (err: any) {
            console.error('Erro ao processar confirmação de venda.' + err.message)
        }
    }
}   