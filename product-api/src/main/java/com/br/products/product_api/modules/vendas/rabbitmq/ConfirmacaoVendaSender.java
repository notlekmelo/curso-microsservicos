package com.br.products.product_api.modules.vendas.rabbitmq;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.br.products.product_api.modules.vendas.dto.ConfirmacaoVendaDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ConfirmacaoVendaSender {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app-config.rabbit.routingKey.sales-confirmation}")
    private String salesConfirmationRoutingKey;

    @Value("${app-config.rabbit.exchange.product}")
    private String productTopicExchange;

    public void sendSalesConfirmationMessage(ConfirmacaoVendaDTO confirmacao) {
        try {
            rabbitTemplate.convertAndSend(productTopicExchange, salesConfirmationRoutingKey, confirmacao);
        } catch (AmqpException err) {
            log.info("Erro ao enviar mensagem de confirmação de venda.");
        }
    }
}
