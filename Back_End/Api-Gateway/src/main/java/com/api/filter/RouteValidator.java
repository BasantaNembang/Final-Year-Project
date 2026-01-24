package com.api.filter;
import org.springframework.http.server.reactive.ServerHttpRequest;

import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import java.util.*;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    private final AntPathMatcher matcher = new AntPathMatcher();

    private final List<String> urlLists =  List.of(
            "/auth/signup",
            "/auth/refresh_token",
            "/auth/login",
            "/course/get-all",
            "/course/Images/**",
            "/course/get/**",
            "/category/get/**",
            "/auth/get-info/**",
            "/auth/Images/**",
            "/auth/user/**",
            "/room/create/**",
            "/review/get/**",
            "/eureka");

    public Predicate<ServerHttpRequest> isSecured =
            request -> urlLists
                    .stream()
                    .noneMatch(url ->
                            matcher.match(url, request.getURI().getPath())
                    );

}


