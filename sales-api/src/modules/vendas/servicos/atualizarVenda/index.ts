import { VendasRepository } from "../../repositorio/vendas.repository";
import { AtualizarVendaService } from "./atualizarVenda.service";

const vendasRepository = new VendasRepository();
const atualizarVendaService = new AtualizarVendaService(vendasRepository);

export {
    atualizarVendaService
}