import { VendasRepository } from "../../repositorio/vendas.repository";
import { BuscarVendasProdutosController } from "./buscarVendasProdutos.controller";
import { BuscarVendasProdutosService } from "./buscarVendasProdutos.service";

const vendasRepository = new VendasRepository();
const buscarVendasProdutosService = new BuscarVendasProdutosService(vendasRepository);
const buscarVendasProdutosController = new BuscarVendasProdutosController(buscarVendasProdutosService);

export {
    buscarVendasProdutosService, buscarVendasProdutosController
}