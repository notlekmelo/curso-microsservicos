package com.br.products.product_api.config.middleware;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.br.products.product_api.modules.jwt.service.JwtService;

@Configuration
public class MiddlewarConfig implements WebMvcConfigurer {

    @Bean
    public JwtService jwtService(){
        return new JwtService();
    }

    @Bean
    public AuthMiddleware authMiddleware() {
        return new AuthMiddleware(jwtService());
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authMiddleware());
    }
}
