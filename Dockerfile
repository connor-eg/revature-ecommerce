FROM openjdk:8-jre-alpine

COPY target/ecommerce-0.0.1-SNAPSHOT.jar app.jar

ENV spring.ecommerce.url=$spring.ecommerce.url
ENV spring.username=$spring.username
ENV spring.password=$spring.password

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
