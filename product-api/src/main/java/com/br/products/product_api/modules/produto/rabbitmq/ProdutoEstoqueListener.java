package com.br.products.product_api.modules.produto.rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.br.products.product_api.modules.produto.dto.ProdutoEstoqueDTO;
import com.br.products.product_api.modules.produto.service.ProdutoService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProdutoEstoqueListener {

    private final ProdutoService produtoService;

    @RabbitListener(queues="${app-config.rabbit.queue.product-stock}")
    public void receiveProductStockMessage(ProdutoEstoqueDTO produto) {
        produtoService.updateProductStock(produto);
    }
}
