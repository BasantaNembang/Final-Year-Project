
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/api-gateway.jar app.jar

EXPOSE 9090

ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","app.jar"]
