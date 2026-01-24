package com.stream.security;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class MyConfigSecurity {

    @Value("${jwt.secret}")
    private String jwtSecret;


   @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(c->c.disable())
                .authorizeHttpRequests(auth->
                        auth.anyRequest().authenticated())
                .oauth2ResourceServer(server->server
                        .jwt(jwt-> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())));
        return http.build();
    }


    @Bean
    public JwtDecoder jwtDecoder(){  //used to validate the token.............
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        return NimbusJwtDecoder.withSecretKey(key).build();
    }



    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
       JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

       converter.setJwtGrantedAuthoritiesConverter(jwt->{
           JwtGrantedAuthoritiesConverter authoritiesConverter = new JwtGrantedAuthoritiesConverter();
           Collection<GrantedAuthority>  authorities=  authoritiesConverter.convert(jwt);

           Collection<GrantedAuthority> grantedAuthorities =  jwt.getClaimAsStringList("roles")
                   .stream()
                   .map(role->new SimpleGrantedAuthority("ROLE_"+role))
                   .collect(Collectors.toList());
           authorities.addAll(grantedAuthorities);
           return authorities;
       });
       return converter;
    }



}
