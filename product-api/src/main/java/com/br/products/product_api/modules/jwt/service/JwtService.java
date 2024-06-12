package com.br.products.product_api.modules.jwt.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.br.products.product_api.config.excecoes.AutenticacaoException;
import com.br.products.product_api.modules.jwt.dto.JwtResponse;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${app-config.secrets.api-secret}")
    private String apiSecret;

    public void isAuthorized(String token) {
        var accessToken = extractToken(token);
        var claims = Jwts.parserBuilder()
            .setSigningKey(Keys.hmacShaKeyFor(apiSecret.getBytes()))
            .build()
            .parseClaimsJws(accessToken)
            .getBody();
        var user = JwtResponse.getUser(claims);
        if (ObjectUtils.isEmpty(user) || ObjectUtils.isEmpty(user.getUserCode())) {
            throw new AutenticacaoException("O usuário não é válido.");
        }
    }

    private String extractToken(String token) {
        if (ObjectUtils.isEmpty(token)) {
            throw new AutenticacaoException("O token não foi informado.");
        }
        return token;
    }
}
