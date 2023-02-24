# Docker multi-stage build

# 1. Building the App with Maven
FROM maven:3-openjdk-15

ENV SPRING_PROFILES_ACTIVE=production-h2
ADD . /springbootvuejs
WORKDIR /springbootvuejs

# Just echo so we can see, if everything is there :)
RUN ls -l

# Run Maven build
RUN mvn clean install


# Just using the build artifact and then removing the build-container
FROM openjdk:16.0.2-jdk

MAINTAINER ToasteR

VOLUME /tmp

# Add Spring Boot app.jar to Container
COPY --from=0 "/springbootvuejs/backend/target/backend-0.0.1-SNAPSHOT.jar" app.jar

ENV JAVA_OPTS=""

# Fire up our Spring Boot app by default
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.at.toaster.springnuxt.security.egd=file:/dev/./urandom -jar /app.jar" ]