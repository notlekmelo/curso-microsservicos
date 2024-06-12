import { conferirEstoqueService } from "../../../integracoes/api-produtos/servicos/conferirEstoque";
import { VendasRepository } from "../../repositorio/vendas.repository";
import { SalvarVendaController } from "./salvarVenda.controller";
import { SalvarVendaService } from "./salvarVenda.service";

const vendasRepository = new VendasRepository();
const salvarVendaService = new SalvarVendaService(vendasRepository, conferirEstoqueService);
const salvarVendaController = new SalvarVendaController(salvarVendaService);

export {
    salvarVendaService, salvarVendaController
}