package com.course.config;


import com.course.dto.ResponseCourseDTO;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;

import java.time.Duration;
import java.util.List;

@Configuration
public class RedisConfig {

        @Bean
        public RedisCacheManager manager(RedisConnectionFactory redisConnectionFactory) {

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

            Jackson2JsonRedisSerializer<ResponseCourseDTO> singleSerializer =
                    new Jackson2JsonRedisSerializer<>(objectMapper, ResponseCourseDTO.class);

            RedisCacheConfiguration singleCache = RedisCacheConfiguration.defaultCacheConfig()
                    .entryTtl(Duration.ofMinutes(10))
                    .disableCachingNullValues()
                    .serializeValuesWith(RedisSerializationContext.SerializationPair
                            .fromSerializer(singleSerializer));

            JavaType type = objectMapper.getTypeFactory()
                    .constructCollectionType(List.class, ResponseCourseDTO.class);
            Jackson2JsonRedisSerializer<List<ResponseCourseDTO>> listSerializer =
                    new Jackson2JsonRedisSerializer<>(objectMapper, type);

            RedisCacheConfiguration listConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                    .entryTtl(Duration.ofMinutes(10))
                    .disableCachingNullValues()
                    .serializeValuesWith(RedisSerializationContext.SerializationPair
                            .fromSerializer(listSerializer));

            return RedisCacheManager
                    .builder(redisConnectionFactory)
                    .withCacheConfiguration("courses", listConfiguration)
                    .withCacheConfiguration("coursesByCategory", listConfiguration)
                    .withCacheConfiguration("coursesByLevel", listConfiguration)
                    .withCacheConfiguration("coursesByPrice", listConfiguration)
                    .withCacheConfiguration("course", singleCache)
                    .cacheDefaults(singleCache)
                    .build();
        }
}


