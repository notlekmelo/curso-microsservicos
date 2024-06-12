package com.br.products.product_api.modules.categoria.dto;

import java.time.LocalDateTime;

import org.springframework.beans.BeanUtils;

import com.br.products.product_api.modules.categoria.model.Categoria;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class CategoriaResponse {

    private Integer codigoCategoria;
    private String descricao;
    @JsonFormat(pattern= "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime inseridoEm; 
    @JsonFormat(pattern= "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime modificadoEm;

    public static CategoriaResponse of(Categoria categoria){
        var response = new CategoriaResponse();
        BeanUtils.copyProperties(categoria, response);
        return response;
    }
}
