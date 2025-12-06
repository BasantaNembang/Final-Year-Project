package com.auth.service;

import com.auth.dto.JwtDto;
import com.auth.entity.Account;
import com.auth.entity.RefreshToken;
import com.auth.entity.Teacher;
import com.auth.error.AuthException;
import com.auth.reposistory.AccountRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String theKEY;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RefreshTokenService refreshTokenService;



    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }


    private <T> T extractClaim(String token, Function<Claims, T> claimsTFunction) {
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }


    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }



    private SecretKey getSecretKey() {
        byte [] byteKey = Decoders.BASE64.decode(theKEY);
        return Keys.hmacShaKeyFor(byteKey);
    }


    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }


    private Boolean isTokenExpired(String token){
       return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


    public String getJwtToken(String username){

        Account account = accountRepository.findByEmail(username).get();

        if(account==null){
            throw new UsernameNotFoundException("unable to create JWT token cause " +username+ " is not in DB");
        }


        Map<String, Object> cls = new HashMap<>();
        cls.put("roles", account instanceof Teacher ? "MENTOR" : "STUDENT");
         return Jwts.builder()
                 .claims()
                 .add(cls)
                 .setSubject(username)
                 .issuedAt(new Date(System.currentTimeMillis()))
                 .expiration(new Date(System.currentTimeMillis() + 180000 )) // 3 mins
                 .and()
                 .signWith(getSecretKey(),  SignatureAlgorithm.HS256).compact();
    }



    public JwtDto getRefreshToken(String refreshToken) {
        return refreshTokenService.getRefreshToken(refreshToken)
                .map(refreshTokenService::verifyExpirationRefreshToken)
                .map(RefreshToken::getAccount)
                .map(account -> {
                    String jwtToken = getJwtToken(account.getEmail());
                    return JwtDto.builder()
                            .jwtToken(jwtToken)
                            .refreshToken(refreshToken)
                            .build();
                })
                .orElseThrow(()->new AuthException("Time-Out for refresh token--Please Log-In"));
    }
}

