
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/cart-service.jar app.jar

EXPOSE 8092

ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","app.jar"]


