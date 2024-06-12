import { VendasRepository } from "../../repositorio/vendas.repository";
import { BuscarVendasController } from "./buscarVendas.controller";
import { BuscarVendasService } from "./buscarVendas.service";

const vendasRepository = new VendasRepository();
const buscarVendasService = new BuscarVendasService(vendasRepository);
const buscarVendasController = new BuscarVendasController(buscarVendasService);

export {
    buscarVendasService, buscarVendasController
}