package com.br.products.product_api.modules.produto.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.br.products.product_api.modules.categoria.dto.CategoriaResponse;
import com.br.products.product_api.modules.produto.model.Produto;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendasProdutoResponse {

    private Integer codigoProduto; 
    private String descricao;
    private Integer quantidadeEstoque; 
    private Float preco; 
    private CategoriaResponse categoria;
    @JsonFormat(pattern= "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime inseridoEm; 
    @JsonFormat(pattern= "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime modificadoEm;
    private List<String> vendas;

    public static VendasProdutoResponse of(Produto produto, List<String> vendas) {
        return VendasProdutoResponse.builder()
            .codigoProduto(produto.getCodigoProduto())
            .descricao(produto.getDescricao())
            .quantidadeEstoque(produto.getQuantidadeEstoque())
            .preco(produto.getPreco())
            .categoria(CategoriaResponse.of(produto.getCategoria()))
            .inseridoEm(produto.getInseridoEm())
            .modificadoEm(produto.getModificadoEm())
            .vendas(vendas)
            .build();
    }
}
