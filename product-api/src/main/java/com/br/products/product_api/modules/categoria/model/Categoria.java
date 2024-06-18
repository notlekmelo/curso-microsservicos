package com.br.products.product_api.modules.categoria.model;

import java.time.LocalDateTime;

import org.springframework.beans.BeanUtils;

import com.br.products.product_api.modules.categoria.dto.CategoriaRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Table(name = "Categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CodigoCategoria")
    private Integer codigoCategoria;
    
    @Column(name = "Descricao", nullable = false)
    private String descricao;

    @Column(name = "InseridoEm", nullable = false, updatable = false)
    private LocalDateTime inseridoEm;

    @Column(name = "ModificadoEm", nullable = true)
    private LocalDateTime modificadoEm;

    @PrePersist
    public void prePersist(){
        inseridoEm = LocalDateTime.now();
    }

    public static Categoria of(CategoriaRequest request){
        var categoria = new Categoria();
        BeanUtils.copyProperties(request, categoria);
        return categoria;
    }
}
