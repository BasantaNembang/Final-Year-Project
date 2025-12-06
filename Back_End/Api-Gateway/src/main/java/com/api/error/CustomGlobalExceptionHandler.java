//package com.api.error;
//
//
//import com.api.dto.ErrorDTO;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.cloud.gateway.filter.GatewayFilterChain;
//import org.springframework.cloud.gateway.filter.GlobalFilter;
//import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
//import org.springframework.core.annotation.Order;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.stereotype.Component;
//import org.springframework.web.ErrorResponse;
//import org.springframework.web.server.ServerWebExchange;
//import org.springframework.web.server.WebExceptionHandler;
//import reactor.core.publisher.Mono;
//
//import java.net.URI;
//import java.nio.charset.StandardCharsets;
//
//@Order(-2)
//@Component
//public class CustomGlobalExceptionHandler  implements GlobalFilter {
//
//
//
//            @Override
//            public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//                URI upstreamUri = exchange.getRequest().getURI();
//                System.out.println("Call received: upstream path -------- " + upstreamUri.getPath());
//
//                Object routeAttribute = exchange.getAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);
//                if (routeAttribute != null) {
//                    System.out.println("Route config details -------- " + routeAttribute);
//                }
//
//                // Wrap the filter chain to catch downstream errors
//                return chain.filter(exchange)
//                        .doOnSuccess(aVoid -> {
//                            URI downstreamUri = exchange.getAttribute(ServerWebExchangeUtils.GATEWAY_REQUEST_URL_ATTR);
//                            if (downstreamUri != null) {
//                                System.out.println("Call succeeded: downstream path -------- " + downstreamUri.getPath());
//                            }
//                        })
//                        .onErrorResume(throwable -> {
//                            System.out.println("Downstream service error: " + throwable.getMessage());
//
//                            // Build proper JSON error
//                            exchange.getResponse().setStatusCode(HttpStatus.SERVICE_UNAVAILABLE);
//                            exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);
//
//                            ErrorDTO errorDTO = new ErrorDTO();
//                            errorDTO.setMsg("Downstream service is unavailable: " + throwable.getMessage());
//                            errorDTO.setFlag(false);
//                            errorDTO.setHttpStatus(503);
//
//                            try {
//                                ObjectMapper mapper = new ObjectMapper();
//                                byte[] bytes = mapper.writeValueAsBytes(errorDTO);
//                                return exchange.getResponse().writeWith(
//                                        Mono.just(exchange.getResponse().bufferFactory().wrap(bytes))
//                                );
//                            } catch (JsonProcessingException e) {
//                                System.out.println("Error converting ErrorDTO to JSON: " + e.getMessage());
//                                return exchange.getResponse().setComplete();
//                            }
//                        });
//
//
//
//
//
//
//
//        }
//
//
//
//
//
//    }
//
//
//
////    @Override
////    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
////        System.out.println("__________________________________________________________");
////        System.out.println("Exception caught in Gateway: " + ex.getMessage());
////
////        // Prepare a JSON error
////        exchange.getResponse().getHeaders().add("Content-Type", "application/json");
////        exchange.getResponse().getHeaders().add("Access-Control-Allow-Origin", "http://localhost:3000");
////        exchange.getResponse().getHeaders().add("Access-Control-Allow-Credentials", "true");
////
////        byte[] bytes = ("{\"msg\":\"" + ex.getMessage() + "\", \"flag\":false, \"httpStatus\":500}").getBytes();
////
////        return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(bytes)));
////    }
//
//
//
//
//
//
//
//
