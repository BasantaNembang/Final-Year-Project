
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/eureka-service.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","app.jar"]
