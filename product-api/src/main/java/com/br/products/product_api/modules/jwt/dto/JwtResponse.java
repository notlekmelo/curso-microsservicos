package com.br.products.product_api.modules.jwt.dto;

import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {

    private Integer userCode;
    private String userName;

    public static JwtResponse getUser(Claims jwtClaims){
        try {
            return JwtResponse.builder()
                .userCode((Integer) jwtClaims.get("userCode"))
                .userName((String) jwtClaims.get("userName"))
                .build();
        }
        catch (Exception err) {
            throw null;
        }
    }
}
