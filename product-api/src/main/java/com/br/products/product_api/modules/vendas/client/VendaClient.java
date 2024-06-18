package com.br.products.product_api.modules.vendas.client;

import java.util.Optional;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

import com.br.products.product_api.modules.vendas.dto.VendaResponse;

@HttpExchange("/vendas")
public interface VendaClient {

    @GetExchange("/produto/{codigoProduto}")
    Optional<VendaResponse> findVendabyCodigoProduto(@PathVariable("codigoProduto") Integer codigoProduto,
                                                        @RequestHeader(name="x-access-token") String token);

}
