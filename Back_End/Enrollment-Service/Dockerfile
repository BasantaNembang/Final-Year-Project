
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/enrollment-service.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","app.jar"]
