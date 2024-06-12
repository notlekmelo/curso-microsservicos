package com.br.products.product_api.modules.produto.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerificaEstoqueRequest {

    List<ProdutoQuantidadeDTO> produtos;
}
