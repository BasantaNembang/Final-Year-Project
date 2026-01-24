
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/review-service.jar app.jar

EXPOSE 8091

ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","app.jar"]
