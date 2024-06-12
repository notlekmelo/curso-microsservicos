package com.br.products.product_api.modules.produto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.products.product_api.config.respostas.SucessoResponse;
import com.br.products.product_api.modules.produto.dto.ProdutoRequest;
import com.br.products.product_api.modules.produto.dto.ProdutoResponse;
import com.br.products.product_api.modules.produto.dto.VendasProdutoResponse;
import com.br.products.product_api.modules.produto.dto.VerificaEstoqueRequest;
import com.br.products.product_api.modules.produto.service.ProdutoService;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
    @Autowired
    private ProdutoService produtoService;

    @PostMapping    
    public ProdutoResponse save(@RequestBody ProdutoRequest request) {
        return produtoService.save(request);
    }
    @PostMapping("/conferir-estoque")
    public SucessoResponse conferirEstoque(@RequestBody VerificaEstoqueRequest request) {
        return produtoService.conferirEstoque(request);
    }

    @GetMapping
    public List<ProdutoResponse> findAll() {
        return produtoService.findAll();
    }

    @GetMapping("{codigoProduto}")
    public ProdutoResponse findById(@PathVariable("codigoProduto") Integer codigoProduto) {
        return produtoService.findByIdResponse(codigoProduto);
    }
    
    @GetMapping("/categoria/{codigoCategoria}")
    public List<ProdutoResponse> findByCategoria(@PathVariable("codigoCategoria") Integer codigoCategoria) {
        return produtoService.findByCategoria(codigoCategoria);
    }
    
    @GetMapping("/{codigoProduto}/vendas")
    public VendasProdutoResponse findVendas(@PathVariable("codigoProduto") Integer codigoProduto) {
        return produtoService.findVendasProduto(codigoProduto);
    }

    @DeleteMapping("{codigoProduto}")
    public SucessoResponse delete(@PathVariable("codigoProduto") Integer codigoProduto) {
        return produtoService.delete(codigoProduto);
    } 

    @PutMapping("{codigoProduto}")
    public ProdutoResponse update(@RequestBody ProdutoRequest request, @PathVariable("codigoProduto") Integer codigoProduto) {
        return produtoService.update(request, codigoProduto);
    }
}
