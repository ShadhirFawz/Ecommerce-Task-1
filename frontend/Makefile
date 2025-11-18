.PHONY: install dev build lint help

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

# Install any package by name
install-pkg:
ifndef pkg
	@echo "Error: Please specify package name. Usage: make install-pkg pkg=package-name"
	@exit 1
endif
	@echo "Installing package: $(pkg)"
	pnpm add $(pkg)
