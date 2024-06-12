package com.br.products.product_api.modules.produto.rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.br.products.product_api.modules.produto.dto.ProdutoEstoqueDTO;
import com.br.products.product_api.modules.produto.service.ProdutoService;

@Component
public class ProdutoEstoqueListener {

    @Autowired
    private ProdutoService produtoService;

    @RabbitListener(queues="${app-config.rabbit.queue.product-stock}")
    public void receiveProductStockMessage(ProdutoEstoqueDTO produto) {
        produtoService.updateProductStock(produto);
    }
}
