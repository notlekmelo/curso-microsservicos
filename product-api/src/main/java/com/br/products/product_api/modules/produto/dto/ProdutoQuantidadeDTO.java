package com.br.products.product_api.modules.produto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoQuantidadeDTO {
    
    private Integer codigoProduto;
    private Integer quantidade;
    
}
