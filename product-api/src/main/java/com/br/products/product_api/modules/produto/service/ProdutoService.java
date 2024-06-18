package com.br.products.product_api.modules.produto.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.br.products.product_api.config.excecoes.ExcecaoValidacao;
import static com.br.products.product_api.config.middleware.RequestUtil.getCurrentRequest;
import com.br.products.product_api.config.respostas.SucessoResponse;
import com.br.products.product_api.modules.categoria.service.CategoriaService;
import com.br.products.product_api.modules.produto.dto.ProdutoEstoqueDTO;
import com.br.products.product_api.modules.produto.dto.ProdutoRequest;
import com.br.products.product_api.modules.produto.dto.ProdutoResponse;
import com.br.products.product_api.modules.produto.dto.VendasProdutoResponse;
import com.br.products.product_api.modules.produto.dto.VerificaEstoqueRequest;
import com.br.products.product_api.modules.produto.model.Produto;
import com.br.products.product_api.modules.produto.repository.ProdutoRepository;
import com.br.products.product_api.modules.vendas.client.VendaClient;
import com.br.products.product_api.modules.vendas.dto.ConfirmacaoVendaDTO;
import com.br.products.product_api.modules.vendas.enums.VendasStatus;
import com.br.products.product_api.modules.vendas.rabbitmq.ConfirmacaoVendaSender;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@AllArgsConstructor
public class ProdutoService {
    
    private final ProdutoRepository produtoRepository;
    
    private final CategoriaService categoriaService;
    
    private final ConfirmacaoVendaSender confirmacaoVendaSender;
    
    private final VendaClient vendaClient;

    public ProdutoResponse save(ProdutoRequest request) {
        validarNovoProduto(request);
        var categoria = categoriaService.findById(request.getCodigoCategoria());
        var produto = produtoRepository.save(Produto.of(request, categoria));
        return ProdutoResponse.of(produto);
    }
    
    public ProdutoResponse update(ProdutoRequest request, Integer id) {
        validarNovoProduto(request);
        var produtoExistente = findById(id);
        var categoria = categoriaService.findById(request.getCodigoCategoria());
        var produto = Produto.of(request, categoria);
        produto.setModificadoEm(LocalDateTime.now());
        produto.setInseridoEm(produtoExistente.getInseridoEm());
        produto.setCodigoProduto(id);
        var produtoAtualizado = produtoRepository.save(produto);
        return ProdutoResponse.of(produtoAtualizado);
    }

    private void validarNovoProduto(ProdutoRequest request) {
        if (ObjectUtils.isEmpty(request.getDescricao())) {
            throw new ExcecaoValidacao("A descrição do produto não foi informada");
        }
        else if (ObjectUtils.isEmpty(request.getQuantidadeEstoque()) ||request.getQuantidadeEstoque() < 0) {
            throw new ExcecaoValidacao("A quantidade em estoque deve ser um número inteiro não negativo.");
        }
        else if (ObjectUtils.isEmpty(request.getPreco()) ||request.getPreco() < 0) {
            throw new ExcecaoValidacao("O preco do produto tem que ser um número não negativo.");
        }
        else if (ObjectUtils.isEmpty(request.getCodigoCategoria())) {
            throw new ExcecaoValidacao("O código da categoria é obrigatório.");
        }
    }

    public List<ProdutoResponse> findAll(){
        return produtoRepository.findAll().stream().map(produto -> ProdutoResponse.of(produto)).collect(Collectors.toList());
    }

    public Produto findById(Integer id) {
        if (ObjectUtils.isEmpty(id)) {
            throw new ExcecaoValidacao("O id do produto é obrigatório.");
        }
        return produtoRepository.findById(id).orElseThrow(() -> new ExcecaoValidacao("O produto informado não foi encontado"));
    } 
    
    public ProdutoResponse findByIdResponse(Integer id) {
        var produto = produtoRepository.findById(id).orElseThrow(() -> new ExcecaoValidacao("O produto informado não foi encontado"));
        return ProdutoResponse.of(produto);
    } 
    
    public List<ProdutoResponse> findByCategoria(Integer id) {
        return produtoRepository.findByCategoriaCodigoCategoria(id).stream().map(produto -> ProdutoResponse.of(produto)).collect(Collectors.toList());
    } 

    public Boolean existsByCategoriaCodigoCategoria(Integer id) {
        return produtoRepository.existsByCategoriaCodigoCategoria(id);
    }

    public SucessoResponse delete(Integer id) {
        if (ObjectUtils.isEmpty(id)) {
            throw new ExcecaoValidacao("O id do produto a ser deletado é obrigatório.");
        }
        produtoRepository.deleteById(id);
        return SucessoResponse.create("O produto foi excluído.");
    }

    @Transactional
    public void updateProductStock(ProdutoEstoqueDTO produtoEstoque) {
        try {
            validateStockUpdateData(produtoEstoque);
            var produtosAtualizar = new ArrayList<Produto>();
            produtoEstoque.getProdutos().forEach(produtoVenda -> {
                var produtoExistente = findById(produtoVenda.getCodigoProduto());
                if (produtoVenda.getQuantidade() > produtoExistente.getQuantidadeEstoque()) {
                    throw new ExcecaoValidacao("O produto " + produtoExistente.getDescricao() + " não tem a quantidade solicitada disponível.");
                }
                produtoExistente.updateStock(produtoVenda.getQuantidade());
                produtosAtualizar.add(produtoExistente);
            });
            produtoRepository.saveAll(produtosAtualizar);
            confirmacaoVendaSender.sendSalesConfirmationMessage(new ConfirmacaoVendaDTO(produtoEstoque.getCodigoVenda(), VendasStatus.Aprovado, ""));
        }
        catch (Exception err) {
            confirmacaoVendaSender.sendSalesConfirmationMessage(new ConfirmacaoVendaDTO(produtoEstoque.getCodigoVenda(), VendasStatus.Rejeitado, err.getMessage()));
            log.error("Erro ao tentar atualizar o estoque.");
        }
    }

    public void validateStockUpdateData(ProdutoEstoqueDTO produto) {
        if (ObjectUtils.isEmpty(produto) || ObjectUtils.isEmpty(produto.getCodigoVenda())) {
            throw new ExcecaoValidacao("Os dados do produto devem ser enviados.");
        }
        else if (ObjectUtils.isEmpty(produto.getProdutos())){
            throw new ExcecaoValidacao("Os produtos devem ser enviados");
        }
        produto.getProdutos().forEach(produtoVenda -> {
            if (ObjectUtils.isEmpty(produtoVenda.getQuantidade()) || ObjectUtils.isEmpty(produtoVenda.getCodigoProduto())) {
                throw new ExcecaoValidacao("Um dos produtos contem dados inconsistentes.");
            }
        });
    }

    public VendasProdutoResponse findVendasProduto(Integer id) {
        var produto = findById(id);
        try {
            var currentRequest = getCurrentRequest();
            var token = currentRequest.getHeader("x-access-token");
            var vendas = vendaClient.findVendabyCodigoProduto(id,token).orElseThrow(() -> new ExcecaoValidacao("Este produto ainda não foi vendido"));
            return VendasProdutoResponse.of(produto, vendas.getData());
        } catch (Exception err) {
            throw new ExcecaoValidacao("Ocorreu um erro ao buscar as vendas desse produto");
        }
    }

    public SucessoResponse conferirEstoque(VerificaEstoqueRequest request) {
        if (ObjectUtils.isEmpty(request) || ObjectUtils.isEmpty(request.getProdutos())) {
            throw new ExcecaoValidacao("Os produtos devem ser informados.");
        }
        request.getProdutos().forEach(produto -> {
            if (ObjectUtils.isEmpty(produto.getQuantidade())) {
                throw new ExcecaoValidacao("A quantidade deve ser informada..");
            }
            var produtoEncontrado = findById(produto.getCodigoProduto());
            if (produto.getQuantidade() > produtoEncontrado.getQuantidadeEstoque()) {
                throw new ExcecaoValidacao("Não há estoque suficiente para o produto: " + produtoEncontrado.getDescricao());
            }
        });
        return SucessoResponse.create("Tem estoque!");
    }
}
