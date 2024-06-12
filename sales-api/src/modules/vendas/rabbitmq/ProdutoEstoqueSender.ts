import amqp from "amqplib/callback_api";
import { rabbitMQURL } from "../../../infra/rabbitmq/rabbitConfig";
import * as QUEUES from "../../../infra/rabbitmq/queue";
import { IProduto } from "../entidades/pedidos";

export function enviaUpdateProdutoEstoqueMessage(produtos: IProduto[], id: string){
    amqp.connect(rabbitMQURL, (error, connection) => {
        if (error) {
          throw error;
        }
        connection.createChannel((errorChannel, channel) => {
            if (errorChannel) {
                throw errorChannel
            } 
            let message = {
                codigoVenda: id,
                produtos
            }
            let jsonStringMessage = JSON.stringify(message);
            channel.publish(QUEUES.PRODUCT_TOPIC, QUEUES.PRODUCT_STOCK_UPDATE_ROUTING_KEY, Buffer.from(jsonStringMessage))
        })
    })
}