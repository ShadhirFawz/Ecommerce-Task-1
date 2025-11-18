.PHONY: install dev build lint help

# Default target
help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make dev        - Start development server"
	@echo "  make build      - Build for production"
	@echo "  make lint       - Run linting"
	@echo "  make clean      - Clean build artifacts and node_modules"
	@echo "  make help       - Show this help message"

# Install dependencies
install:
	@echo "Installing dependencies..."
	pnpm install

# Start development server
dev:
	@echo "Starting development server..."
	pnpm dev

# Build for production
build:
	@echo "Building for production..."
	pnpm build

# Run linting
lint:
	@echo "Running linting..."
	pnpm lint

# Clean build artifacts and node_modules
clean:
	@echo "Cleaning build artifacts..."
	pnpm dlx rimraf ./dist ./build ./.next ./node_modules

# Run tests (if you have tests)
test:
	@echo "Running tests..."
	pnpm test
