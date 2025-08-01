# Multi-stage build for optimal image size
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Set working directory
WORKDIR /app

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Production stage
FROM eclipse-temurin:17-jre-alpine

# Add non-root user for security
RUN adduser -D -s /bin/sh springuser

# Set working directory
WORKDIR /app

# Copy the built jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Change ownership of the app directory
RUN chown -R springuser:springuser /app

# Switch to non-root user
USER springuser

# Expose port
EXPOSE 8080

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]