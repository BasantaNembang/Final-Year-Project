package com.enroll.config;

import com.enroll.error.FeginClientErrorHandller;
import com.enroll.service.JwtService;
import feign.codec.ErrorDecoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Configuration
public class MyConfig {

    @Autowired
    private JwtService jwtService;

    @Bean
    ErrorDecoder errorDecoder(){
        return new FeginClientErrorHandller();
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
       RestTemplate template = new RestTemplate();

       //adding interceptor to the restTemplate
        template.getInterceptors().add(new ClientHttpRequestInterceptor() {
            @Override
            public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
              String token = jwtService.getToken();
              if(token!=null){
                  request.getHeaders().setBearerAuth(token);
              }
            return execution.execute(request, body);
            }
        });
        return template;
    }


}
