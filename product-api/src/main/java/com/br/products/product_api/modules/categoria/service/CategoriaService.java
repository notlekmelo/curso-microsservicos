package com.br.products.product_api.modules.categoria.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.br.products.product_api.config.excecoes.ExcecaoValidacao;
import com.br.products.product_api.config.respostas.SucessoResponse;
import com.br.products.product_api.modules.categoria.dto.CategoriaRequest;
import com.br.products.product_api.modules.categoria.dto.CategoriaResponse;
import com.br.products.product_api.modules.categoria.model.Categoria;
import com.br.products.product_api.modules.categoria.repository.CategoriaRepository;
import com.br.products.product_api.modules.produto.service.ProdutoService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor_ = { @Lazy})
public class CategoriaService {
    
    private final CategoriaRepository categoriaRepository;

    @Lazy
    private final ProdutoService produtoService;

    public CategoriaResponse save(CategoriaRequest request) {
        validarDescricaoCategoria(request);
        var categoria = categoriaRepository.save(Categoria.of(request));
        return CategoriaResponse.of(categoria);
    }

    public CategoriaResponse update(CategoriaRequest request, Integer id) {
        var categoriaExistente = findById(id);
        validarDescricaoCategoria(request);
        var categoria = Categoria.of(request);
        categoria.setCodigoCategoria(id);
        categoria.setModificadoEm(LocalDateTime.now());
        categoria.setInseridoEm(categoriaExistente.getInseridoEm());
        var categoriaAtualizada = categoriaRepository.save(categoria);
        return CategoriaResponse.of(categoriaAtualizada);
    }

    private void validarDescricaoCategoria(CategoriaRequest request) {
        if (ObjectUtils.isEmpty(request.getDescricao())) {
            throw new ExcecaoValidacao("A descrição da categoria não foi informada");
        }
    }

    public Categoria findById(Integer id) {
        if (ObjectUtils.isEmpty(id)) {
            throw new ExcecaoValidacao("O id da categoria é obrigatório.");
        }
        return categoriaRepository.findById(id).orElseThrow(() -> new ExcecaoValidacao("A categoria informada não foi encontada"));
    } 

    public List<CategoriaResponse> findAll(){
        return categoriaRepository.findAll().stream().map(categoria -> CategoriaResponse.of(categoria)).collect(Collectors.toList());
    }

    public SucessoResponse delete(Integer id) {
        if (ObjectUtils.isEmpty(id)) {
            throw new ExcecaoValidacao("O id da categoria a ser deletada é obrigatório.");
        }
        else if (produtoService.existsByCategoriaCodigoCategoria(id)) {
            throw new ExcecaoValidacao("Você não pode remover essa categoria porque ela está em uso em um produto.");
        }
        categoriaRepository.deleteById(id);
        return SucessoResponse.create("A categoria foi excluída.");
    }
}
