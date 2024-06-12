package com.br.products.product_api.config.middleware;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MiddlewarConfig implements WebMvcConfigurer {

    @Bean
    public AuthMiddleware authMiddleware() {
        return new AuthMiddleware();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authMiddleware());
    }
}
