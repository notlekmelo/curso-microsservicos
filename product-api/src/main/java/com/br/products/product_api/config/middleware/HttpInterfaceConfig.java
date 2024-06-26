package com.br.products.product_api.config.middleware;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import com.br.products.product_api.modules.vendas.client.VendaClient;

@Configuration
public class HttpInterfaceConfig {

    @Value("${app-config.services.sales}")
    private String baseUrl ;

    @Bean
    public VendaClient salesClient() {
        return HttpServiceProxyFactory
            .builderFor(WebClientAdapter
                .create(WebClient
                    .builder()
                    .baseUrl(baseUrl)
                    .build()))
            .build()
            .createClient(VendaClient.class);
    }
}
