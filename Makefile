# Rentacar Application Management

.PHONY: help build up down logs clean dev-up dev-down prod-up prod-down restart health db-connect db-shell db-tables db-schemas db-users db-customers db-cars db-brands db-models db-rentals db-stats db-backup db-restore db-reset db-logs

# Default target
help:
	@echo "Available commands:"
	@echo ""
	@echo "Environment Management:"
	@echo "  build     - Build all Docker images"
	@echo "  up        - Start production environment"
	@echo "  down      - Stop production environment"
	@echo "  dev-up    - Start development environment"
	@echo "  dev-down  - Stop development environment"
	@echo "  prod-up   - Start production environment"
	@echo "  prod-down - Stop production environment"
	@echo "  restart   - Restart all services"
	@echo "  clean     - Remove all containers, images, and volumes"
	@echo ""
	@echo "Logs & Monitoring:"
	@echo "  logs      - Show logs from all services"
	@echo "  logs-backend  - Show backend logs"
	@echo "  logs-frontend - Show frontend logs"
	@echo "  logs-postgres - Show database logs"
	@echo "  health    - Check service health status"
	@echo ""
	@echo "Database Operations:"
	@echo "  db-connect    - Connect to PostgreSQL database (interactive)"
	@echo "  db-shell      - Open PostgreSQL shell"
	@echo "  db-tables     - List all database tables"
	@echo "  db-stats      - Show database statistics"
	@echo "  db-users      - Show users table data"
	@echo "  db-customers  - Show customers table data"
	@echo "  db-cars       - Show cars table data"
	@echo "  db-brands     - Show brands table data"
	@echo "  db-models     - Show models table data"
	@echo "  db-rentals    - Show rentals table data"
	@echo "  db-backup     - Create database backup"
	@echo "  db-restore    - Restore database (use: make db-restore FILE=backup.sql)"
	@echo "  db-reset      - Reset database (WARNING: deletes all data)"

# Build all images
build:
	@echo "Building all Docker images..."
	docker-compose build

# Production environment
prod-up:
	@echo "Starting production environment..."
	docker-compose up -d
	@echo "Application is starting up..."
	@echo "Frontend: http://localhost"
	@echo "Backend API: http://localhost:8080"
	@echo "Database: localhost:5432"

prod-down:
	@echo "Stopping production environment..."
	docker-compose down

# Development environment
dev-up:
	@echo "Starting development environment..."
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Development environment is starting up..."
	@echo "Frontend: http://localhost:3000"
	@echo "Backend API: http://localhost:8080"
	@echo "Database: localhost:5432"

dev-down:
	@echo "Stopping development environment..."
	docker-compose -f docker-compose.dev.yml down

# Default up/down commands (production)
up: prod-up
down: prod-down

# Show logs
logs:
	docker-compose logs -f

# Show specific service logs
logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

logs-postgres:
	docker-compose logs -f postgres

# Clean everything
clean:
	@echo "Cleaning up Docker resources..."
	docker-compose down -v --rmi all
	docker-compose -f docker-compose.dev.yml down -v --rmi all
	docker system prune -f
	@echo "Cleanup completed!"

# Restart services
restart:
	docker-compose restart

restart-backend:
	docker-compose restart backend

restart-frontend:
	docker-compose restart frontend

# Database operations
db-reset:
	@echo "Resetting database..."
	docker-compose down postgres
	docker volume rm rentacar_postgres_data
	docker-compose up -d postgres

# Database connection and data viewing
db-connect:
	@echo "Connecting to PostgreSQL database..."
	docker exec -it rentacar-postgres psql -U postgres -d rentacar_db

db-shell:
	@echo "Opening PostgreSQL shell..."
	docker exec -it rentacar-postgres psql -U postgres -d rentacar_db

db-tables:
	@echo "Listing all tables..."
	docker exec -it rentacar-postgres psql -U postgres -d rentacar_db -c "\dt"

db-schemas:
	@echo "Showing database schemas..."
	docker exec -it rentacar-postgres psql -U postgres -d rentacar_db -c "\dn"

# View table data
db-users:
	@echo "Showing users table..."
	docker exec -it rentacar-postgres psql -U postgres -d rentacar_db -c "SELECT id, username, email, created_at FROM users ORDER BY id LIMIT 20;"

db-customers:
	@echo "Showing customers table..."
	docker exec -it rentacar-postgres psql -U postgres -d rentacar_db -c "SELECT id, first_name, last_name, email, birth_date FROM customers ORDER BY id LIMIT 20;"

db-cars:
	@echo "Showing cars table..."
	docker exec -it rentacar-postgres psql -U postgres -d rentacar_db -c "SELECT id, plate, kilometer, daily_price, model_year FROM cars ORDER BY id LIMIT 20;"

db-brands:
	@echo "Showing brands table..."
	docker exec -it rentacar-postgres psql -U postgres -d rentacar_db -c "SELECT * FROM brands ORDER BY id;"

db-models:
	@echo "Showing models table..."
	docker exec -it rentacar-postgres psql -U postgres -d rentacar_db -c "SELECT id, name, brand_id FROM models ORDER BY brand_id, id LIMIT 20;"

db-rentals:
	@echo "Showing rentals table..."
	docker exec -it rentacar-postgres psql -U postgres -d rentacar_db -c "SELECT id, customer_id, car_id, start_date, end_date, total_price FROM rentals ORDER BY id DESC LIMIT 20;"

# Database statistics
db-stats:
	@echo "Database statistics..."
	docker exec -it rentacar-postgres psql -U postgres -d rentacar_db -c "SELECT 'Users' as table_name, COUNT(*) as count FROM users UNION ALL SELECT 'Customers', COUNT(*) FROM customers UNION ALL SELECT 'Cars', COUNT(*) FROM cars UNION ALL SELECT 'Rentals', COUNT(*) FROM rentals UNION ALL SELECT 'Brands', COUNT(*) FROM brands UNION ALL SELECT 'Models', COUNT(*) FROM models;"

# Database backup and restore
db-backup:
	@echo "Creating database backup..."
	docker exec rentacar-postgres pg_dump -U postgres rentacar_db > backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "Backup created: backup_$(shell date +%Y%m%d_%H%M%S).sql"

db-restore:
	@echo "Usage: make db-restore FILE=backup_file.sql"
	@if [ -z "$(FILE)" ]; then echo "Please specify FILE parameter"; exit 1; fi
	docker exec -i rentacar-postgres psql -U postgres -d rentacar_db < $(FILE)

# Database logs
db-logs:
	docker-compose logs -f postgres

# Health check
health:
	@echo "Checking service health..."
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 