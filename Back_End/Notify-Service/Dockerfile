
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/notify-service.jar app.jar

EXPOSE 8089

ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","app.jar"]
