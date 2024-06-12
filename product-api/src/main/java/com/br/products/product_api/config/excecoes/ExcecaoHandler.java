package com.br.products.product_api.config.excecoes;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExcecaoHandler {

    @ExceptionHandler(ExcecaoValidacao.class)
    public ResponseEntity<?> handleExcecaoValidacao(ExcecaoValidacao validacao) {
        var details = new ExcecaoDetalhes();
        details.setStatus(HttpStatus.BAD_REQUEST.value());
        details.setMessage(validacao.getMessage());
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(AutenticacaoException.class)
    public ResponseEntity<?> handleExcecaoValidacao(AutenticacaoException validacao) {
        var details = new ExcecaoDetalhes();
        details.setStatus(HttpStatus.UNAUTHORIZED.value());
        details.setMessage(validacao.getMessage());
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }
}
