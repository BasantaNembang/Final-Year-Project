package com.chat.security;


import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Service
public class JwtHelper {

    @Value("${jwt.secret}")
    private String SECRET;

    public boolean validateToken(String token) {
       try{
           Jwts.parser()
                   .verifyWith(getSignKey())
                   .build()
                   .parseSignedClaims(token);
           return true;
       } catch (JwtException e) {
           return false;
       }
    }

    private SecretKey getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }


}

