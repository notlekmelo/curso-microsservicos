package com.br.products.product_api.config.middleware;

import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.br.products.product_api.modules.jwt.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthMiddleware implements HandlerInterceptor {

    private final JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (HttpMethod.OPTIONS.name().equals(request.getMethod())) {
            return true;
        }
        var authorization = request.getHeader("x-access-token");
        jwtService.isAuthorized(authorization);
        return true;
    }
}
