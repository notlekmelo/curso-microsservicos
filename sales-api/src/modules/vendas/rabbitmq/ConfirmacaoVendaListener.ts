import amqp from "amqplib/callback_api";
import { rabbitMQURL } from "../../../infra/rabbitmq/rabbitConfig";
import * as QUEUES from "../../../infra/rabbitmq/queue";
import { atualizarVendaService } from "../servicos/atualizarVenda";

export function listenToSalesConfirmationQueue() {
  amqp.connect(rabbitMQURL, (error, connection) => {
    if (error) {
      throw error;
    }
    connection.createChannel((errorChannel, channel) => {
      if (errorChannel) {
        throw errorChannel;
      }
      channel.consume(
        QUEUES.SALES_CONFIRMATION_QUEUE,
        (message) => {
          atualizarVendaService.executar(message);
        },
        { noAck: true }
      );
    });
  });
}
