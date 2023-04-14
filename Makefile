# Define the list of environments to deploy
ENVIRONMENTS := dev prod

.PHONY: $(ENVIRONMENTS)

# Pattern rule to deploy environment-specific containers
$(ENVIRONMENTS):
	docker compose -f docker-compose.yml -f docker-compose.$@.yml build --no-cache

# Target to start environment-specific images
up:
	docker compose -f docker-compose.yml -f docker-compose.$(ENV).yml up -d

down:
	docker compose -f docker-compose.yml -f docker-compose.$(ENV).yml down

logs:
	docker compose -f docker-compose.yml -f docker-compose.$(ENV).yml logs web -f

# Spins up mongoDB single node replica for local development
mongo:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up mongo -d

# Set default environment to "dev" if not specified
ENV ?= dev

