package com.api.filter;

import com.api.helper.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private JwtHelper jwtHelper;

    public AuthenticationFilter(){
        super(Config.class);
    }

   private String jwtToken = null;

    @Override
    public GatewayFilter apply(Config config) {
        return (((exchange, chain) -> {
          ServerHttpRequest request = null;
          if(validator.isSecured.test(exchange.getRequest())){

              if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                  throw new RuntimeException("Missing authorization Header");
              }

              String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
              if(authHeader!=null && authHeader.startsWith("Bearer ")){
                   jwtToken = authHeader.substring(7);
              }

              try{
                jwtHelper.validateToken(jwtToken);
                request =  exchange.getRequest()
                        .mutate()
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtToken)
                        .build();

              } catch (RuntimeException e) {
                  throw new RuntimeException("unauthorized access");
              }
          }
           return chain.filter(exchange.mutate().request(request).build());
        }));
    }




    public static class Config{
    }

}
