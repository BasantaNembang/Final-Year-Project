
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/stream-service.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","app.jar"]
