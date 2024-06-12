import { buscarVendasDefinitions, buscarVendasPath } from "../../modules/vendas/servicos/buscarVendas/buscarVendas.swagger";
import { buscarVendasProdutosDefinitions, buscarVendasProdutosPath } from "../../modules/vendas/servicos/buscarVendasProdutos/buscarVendasProdutos.swagger";
import { salvarVendaDefinitions, salvarVendaPath } from "../../modules/vendas/servicos/salvarVenda/salvarVenda.swagger";
import retornosPadraoDefinitions from "./retornosPadrao.swagger";

const tags = [
    {name: 'Vendas'},
];
const pathsDefindos: any[] = [
    salvarVendaPath,
    buscarVendasPath,
    buscarVendasProdutosPath,
];
const definitionsDefinidas: any[] = [
    retornosPadraoDefinitions,
    salvarVendaDefinitions,
    buscarVendasDefinitions,
    buscarVendasProdutosDefinitions
];

const paths = {};

for (let item of pathsDefindos) {
    for (let prop in item) {
        // @ts-ignore
        if (paths.hasOwnProperty(prop)) Object.assign(paths[prop], item[prop]);
        // @ts-ignore
        else paths[prop] = item[prop];
    }
}

const definitions = {};

for (let item of definitionsDefinidas) {
    let objectArrayDefinitions: any = item;
    for (let definition of objectArrayDefinitions) {
        for (let prop in definition) {
            // @ts-ignore
            if (definitions.hasOwnProperty(prop)) Object.assign(definitions[prop], definition[prop]);
            // @ts-ignore
            else definitions[prop] = definition[prop];
        }
    }
}

export { definitions, paths, tags };

