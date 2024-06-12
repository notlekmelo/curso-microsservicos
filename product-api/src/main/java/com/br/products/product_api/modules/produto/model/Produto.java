package com.br.products.product_api.modules.produto.model;

import java.time.LocalDateTime;

import com.br.products.product_api.modules.categoria.model.Categoria;
import com.br.products.product_api.modules.produto.dto.ProdutoRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Table(name = "Produtos")
@Builder
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer codigoProduto;

    @Column(name = "Descricao", nullable = false)
    private String descricao;

    @Column(name = "QuantidadeEstoque", nullable = false)
    private Integer quantidadeEstoque;
    
    @Column(name = "Preco", nullable = false)
    private Float preco;

    @Column(name = "InseridoEm", nullable = false, updatable = false)
    private LocalDateTime inseridoEm;
    
    @Column(name = "ModificadoEm", nullable = true)
    private LocalDateTime modificadoEm;

    @PrePersist
    public void prePersist(){
        inseridoEm = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "CodigoCategoria", nullable = false)
    private Categoria categoria;

    public static Produto of(ProdutoRequest request, Categoria categoria){
        return Produto.builder()
            .descricao(request.getDescricao())
            .quantidadeEstoque(request.getQuantidadeEstoque())
            .preco(request.getPreco())
            .categoria(categoria)
            .build();
    }

    public void updateStock(Integer quantidade){
        quantidadeEstoque -= quantidade;
        modificadoEm = LocalDateTime.now();
    }
}
