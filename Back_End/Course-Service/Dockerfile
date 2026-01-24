
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/course-service.jar app.jar

EXPOSE 8084

ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","app.jar"]
