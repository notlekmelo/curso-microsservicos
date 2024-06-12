package com.br.products.product_api.modules.produto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.products.product_api.modules.produto.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Integer>{

    List<Produto> findByCategoriaCodigoCategoria(Integer id);

    Boolean existsByCategoriaCodigoCategoria(Integer id);
}
