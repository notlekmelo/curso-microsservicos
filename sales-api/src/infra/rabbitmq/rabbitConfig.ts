import amqp from "amqplib/callback_api";
import * as QUEUES from "./queue";
import { listenToSalesConfirmationQueue } from "../../modules/vendas/rabbitmq/ConfirmacaoVendaListener";

export const rabbitMQURL = process.env.RABBITMQURL || "amqp://localhost:5672";

export async function verificaEnv() {
    if (process.env.NODE_ENV == 'container') {
        console.info("Aguardando início do rabbit mq");
        setInterval(async () => {
            await connectRabbitMq();
        }, 30000)
    }
    else {
        await connectRabbitMq()
    }
}

async function connectRabbitMq() {
  amqp.connect(rabbitMQURL, (error, connection) => {
    if (error) {
      throw error;
    }
    createQueue(
      connection,
      QUEUES.PRODUCT_STOCK_UPDATE_QUEUE,
      QUEUES.PRODUCT_STOCK_UPDATE_ROUTING_KEY,
      QUEUES.PRODUCT_TOPIC
    );
    createQueue(
      connection,
      QUEUES.SALES_CONFIRMATION_QUEUE,
      QUEUES.SALES_CONFIRMATION_ROUTING_KEY,
      QUEUES.PRODUCT_TOPIC
    );
    setTimeout(function () {
      connection.close();
    }, 60000);
  });
  listenToSalesConfirmationQueue()
}

function createQueue(
  connection: amqp.Connection,
  queue: string,
  routingKey: string,
  topic: string
) {
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }
    channel.assertExchange(topic, "topic", { durable: true });
    channel.assertQueue(queue, { durable: true });
    channel.bindQueue(queue, topic, routingKey);
  });
}
