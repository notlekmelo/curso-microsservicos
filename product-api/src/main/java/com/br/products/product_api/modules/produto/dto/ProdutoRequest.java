package com.br.products.product_api.modules.produto.dto;

import lombok.Data;

@Data
public class ProdutoRequest {

    private String descricao;
    private Integer quantidadeEstoque;
    private Float preco;
    private Integer codigoCategoria;
}
