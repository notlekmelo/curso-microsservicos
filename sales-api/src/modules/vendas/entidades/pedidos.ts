import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

export interface IPedido {
    Produtos: Array<IProduto>;
    ValorTotal: number;
    Status: String;
    InseridoPor?: Object;
    InseridoEm?: Date;
    ModificadoEm?: Date;
    Observacao?: String;
}

export interface IProduto {
    codigoProduto: number;
    quantidade: number;
}

const PedidoSchema = new Schema({
    Produtos: {
        type: Array,
        required: true,
    },
    ValorTotal: {
        type: Number,
        required: true,
    },
    Status: {
        type: String,
        required: true
    },
    InseridoPor: {
        type: Object,
        required: true
    },
    InseridoEm: {
        type: Date,
        required: true,
    },
    ModificadoEm: {
        type: Date,
    },
    Observacao: {
        type: String
    }
})

export default model("Pedido", PedidoSchema)