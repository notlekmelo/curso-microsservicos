package com.br.products.product_api.config.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.br.products.product_api.config.excecoes.ExcecaoValidacao;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class FeingClientAuthMiddleware implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        var currentRequest = getCurrentRequest();
        template.header("x-access-token", currentRequest.getHeader("x-access-token"));
    }

    private HttpServletRequest getCurrentRequest() {
        try {
            return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        } catch (Exception e) {
            throw new ExcecaoValidacao("A requisição não pode ser processada.");
        }
    }
}
