package com.br.products.product_api.config.respostas;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SucessoResponse {

    private Integer status;
    private String message;

    public static SucessoResponse create(String message) {
        return SucessoResponse.builder()
            .status(HttpStatus.OK.value())
            .message(message)
            .build();
    }
}
