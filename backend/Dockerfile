FROM openjdk:17-oracle
WORKDIR /app
EXPOSE 8080
COPY target/*.jar application.jar
ENTRYPOINT ["java","-jar","application.jar"]