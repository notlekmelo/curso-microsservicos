package com.br.products.product_api.modules.categoria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.products.product_api.modules.categoria.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

}
