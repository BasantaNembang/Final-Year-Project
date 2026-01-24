
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/category-service.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","app.jar"]


