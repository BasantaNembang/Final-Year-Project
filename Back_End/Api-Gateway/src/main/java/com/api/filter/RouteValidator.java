package com.api.filter;
import org.springframework.http.server.reactive.ServerHttpRequest;

import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    private final List<String> urlLists =  List.of(
            "/auth/signup",
            "/auth/refresh_token",
            "/auth/login",
            "/auth/info/*",
            "/course/get-all",
            "/course/Images/**",
            "/eureka");


    public Predicate<ServerHttpRequest> isSecured =
            request -> urlLists
                    .stream()
                    .noneMatch(uri->request.getURI().getPath().contains(uri));

}


