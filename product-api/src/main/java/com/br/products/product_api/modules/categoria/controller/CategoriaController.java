package com.br.products.product_api.modules.categoria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.br.products.product_api.modules.categoria.dto.CategoriaRequest;
import com.br.products.product_api.modules.categoria.dto.CategoriaResponse;
import com.br.products.product_api.modules.categoria.service.CategoriaService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import com.br.products.product_api.config.respostas.SucessoResponse;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping    
    public CategoriaResponse save(@RequestBody CategoriaRequest request) {
        return categoriaService.save(request);
    }

    @GetMapping
    public List<CategoriaResponse> findAll() {
        return categoriaService.findAll();
    }

    @DeleteMapping("{codigoCategoria}")
    public SucessoResponse delete(@PathVariable("codigoCategoria") Integer codigoCategoria) {
        return categoriaService.delete(codigoCategoria);
    } 

    @PutMapping("{codigoCategoria}")
    public CategoriaResponse update(@RequestBody CategoriaRequest request, @PathVariable("codigoCategoria") Integer codigoCategoria) {
        return categoriaService.update(request, codigoCategoria);
    }
}
