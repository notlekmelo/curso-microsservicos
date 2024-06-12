package com.br.products.product_api.modules.vendas.dto;

import com.br.products.product_api.modules.vendas.enums.VendasStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmacaoVendaDTO {

    private String codigoVenda;
    private VendasStatus status;
    private String mensagemErro;
}
