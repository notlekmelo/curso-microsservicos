package com.br.products.product_api.config.middleware;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.br.products.product_api.config.excecoes.ExcecaoValidacao;

import jakarta.servlet.http.HttpServletRequest;

public class RequestUtil {

    public static HttpServletRequest getCurrentRequest() {
        try {
            return ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes())
                .getRequest();
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new ExcecaoValidacao("The current request could not be proccessed.");
        }
    }
}
