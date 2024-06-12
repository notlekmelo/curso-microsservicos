import { ErrorHTTP } from "../../../infra/server/server";
import Pedido, { IPedido } from '../entidades/pedidos';
import { Model } from "mongoose";

export class VendasRepository {
    async salvar(data: any) {
        try {
            const pedido = await Pedido.create(data)
            return pedido
        } catch (err) {
            throw new ErrorHTTP(500, "Não foi possível salvar esse pedido.")
        }
    }

    async buscar(codigoUsuario: number) {
        let busca = await Pedido.find({"InseridoPor.CodigoUsuario": codigoUsuario});
        return busca;
    }
    
    async findByProduto(codigoUsuario: number, codigoProduto: number) {
        let busca = await Pedido.find({"Produtos.codigoProduto" : Number(codigoProduto), "InseridoPor.CodigoUsuario": codigoUsuario});
        return busca;
    }
    
    async findById(id: string) {
        let busca = await Pedido.findById(id);
        return busca;
    }

    async excluir(CodigoUsuario: number){
        // return await super.deletar("Usuarios", {CodigoUsuario} )
        return ''
    }
}