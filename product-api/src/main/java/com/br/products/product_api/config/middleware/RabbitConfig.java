package com.br.products.product_api.config.middleware;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    @Value("${app-config.rabbit.exchange.product}")
    private String productTopicExchange;

    @Value("${app-config.rabbit.routingKey.product-stock}")
    private String productStockRoutingKey;

    @Value("${app-config.rabbit.routingKey.sales-confirmation}")
    private String salesConfirmationRoutingKey;

    @Value("${app-config.rabbit.queue.product-stock}")
    private String productStockQueue;

    @Value("${app-config.rabbit.queue.sales-confirmation}")
    private String salesConfirmationQueue;

    @Bean
    public TopicExchange productTopicExchange() {
        return new TopicExchange(productTopicExchange);
    }

    @Bean
    public Queue productStockMQ() {
        return new Queue(productStockQueue, true);
    }

    @Bean
    public Queue salesConfirmationMQ() {
        return new Queue(salesConfirmationQueue, true);
    }

    @Bean
    public Binding salesConfirmationMQBinding(TopicExchange topicExchange) {
        return BindingBuilder.bind(salesConfirmationMQ())
            .to(topicExchange)
            .with(salesConfirmationRoutingKey);
    }
    
    @Bean
    public Binding productStockMQBinding(TopicExchange topicExchange) {
        return BindingBuilder.bind(productStockMQ())
            .to(topicExchange)
            .with(productStockRoutingKey);
    }
    
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
