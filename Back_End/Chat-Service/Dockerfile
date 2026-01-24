
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/chat-service.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","app.jar"]
