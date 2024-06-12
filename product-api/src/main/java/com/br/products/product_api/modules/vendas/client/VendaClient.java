package com.br.products.product_api.modules.vendas.client;

import java.util.Optional;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.br.products.product_api.modules.vendas.dto.VendaResponse;

@FeignClient(
    name = "vendaClient",
    contextId = "vendaClient",
    url = "${app-config.services.sales}"
)
public interface VendaClient {

    @GetMapping("/vendas/produto/{codigoProduto}")
    Optional<VendaResponse> findVendabyCodigoProduto(@PathVariable("codigoProduto") Integer codigoProduto);

}
