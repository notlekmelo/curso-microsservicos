package com.br.products.product_api.modules.produto.dto;

import java.time.LocalDateTime;

import com.br.products.product_api.modules.categoria.dto.CategoriaResponse;
import com.br.products.product_api.modules.produto.model.Produto;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProdutoResponse {

    private Integer codigoProduto; 
    private String descricao;
    private Integer quantidadeEstoque; 
    private Float preco; 
    private CategoriaResponse categoria;
    @JsonFormat(pattern= "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime inseridoEm; 
    @JsonFormat(pattern= "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime modificadoEm; 

    public static ProdutoResponse of(Produto produto) {
        return ProdutoResponse.builder()
            .codigoProduto(produto.getCodigoProduto())
            .descricao(produto.getDescricao())
            .quantidadeEstoque(produto.getQuantidadeEstoque())
            .preco(produto.getPreco())
            .categoria(CategoriaResponse.of(produto.getCategoria()))
            .inseridoEm(produto.getInseridoEm())
            .modificadoEm(produto.getModificadoEm())
            .build();
    }
}
