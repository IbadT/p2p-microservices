.PHONY: build run test clean docker-build docker-up docker-down docker-logs proto-gen proto-watch install lint format test-grpc db-up db-down kafka-up kafka-down

all: install build

install:
	npm install

build:
	npm run build

run: db-up kafka-up
	@echo "Starting Docker services..."
	@echo "Waiting for services to be ready..."
	@sleep 10
	@echo "Running database migrations..."
	npx prisma migrate deploy
	@echo "Starting the application..."
	npx concurrently "npm run start:dev" "npm run proto:watch"

test:
	npm run test

# Run tests with coverage
test-cov:
	npm run test:cov

test-grpc:
	npx ts-node src/test-grpc.ts

# Clean build artifacts
clean:
	rm -rf dist
	rm -rf node_modules
	rm -rf coverage

docker-build:
	docker compose build --no-cache

docker-up:
	docker compose up -d

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f

db-up:
	docker compose -f docker-compose.db.yml up -d

db-down:
	docker compose -f docker-compose.db.yml down

kafka-up:
	docker compose -f docker-compose.kafka.yml up -d

kafka-down:
	docker compose -f docker-compose.kafka.yml down

proto-gen:
	npm run proto:gen

proto-watch:
	npm run proto:watch

	# Linting and formatting
lint:
	npm run lint

format:
	npm run format

# Database commands
db-migrate:
	npx prisma migrate deploy

db-generate:
	npx prisma generate

db-seed:
	npx prisma db seed

db-migrate-create:
	@read -p "Enter migration name: " name; \
	npx prisma migrate dev --name $$name


# Development setup
dev-setup: install proto-gen build

# Production setup
prod-setup: install proto-gen build

# Help command
help:
	@echo "Available commands:"
	@echo "  make install      - Install dependencies"
	@echo "  make build        - Build the application"
	@echo "  make run          - Run the application in development mode"
	@echo "  make test         - Run tests"
	@echo "  make test-cov     - Run tests with coverage"
	@echo "  make test-grpc    - Run gRPC test client"
	@echo "  make clean        - Clean build artifacts"
	@echo "  make docker-build - Build Docker containers"
	@echo "  make docker-up    - Start Docker containers"
	@echo "  make docker-down  - Stop Docker containers"
	@echo "  make docker-logs  - View Docker container logs"
	@echo "  make db-up        - Start PostgreSQL database"
	@echo "  make db-down      - Stop PostgreSQL database"
	@echo "  make kafka-up     - Start Kafka and Zookeeper"
	@echo "  make kafka-down   - Stop Kafka and Zookeeper"
	@echo "  make proto-gen    - Generate proto files"
	@echo "  make proto-watch  - Watch and generate proto files"
	@echo "  make lint         - Run linter"
	@echo "  make format       - Format code"
	@echo "  make db-migrate   - Run database migrations"
	@echo "  make db-generate  - Generate Prisma client"
	@echo "  make db-seed      - Seed the database"
	@echo "  make db-migrate-create - Create a new migration"
	@echo "  make dev-setup    - Setup development environment"
	@echo "  make prod-setup   - Setup production environment" 