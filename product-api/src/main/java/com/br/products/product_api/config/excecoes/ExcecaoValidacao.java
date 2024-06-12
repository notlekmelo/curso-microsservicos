package com.br.products.product_api.config.excecoes;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ExcecaoValidacao extends RuntimeException {

    public ExcecaoValidacao(String message) {
        super(message);
    }
}
