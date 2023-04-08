# Define the list of environments to deploy
ENVIRONMENTS := dev prod

.PHONY: $(ENVIRONMENTS)

# Pattern rule to deploy environment-specific containers
$(ENVIRONMENTS):
	docker compose -f docker-compose.yml -f docker-compose.$@.yml build

# Target to start environment-specific images
start:
	docker compose -f docker-compose.yml -f docker-compose.$(ENV).yml up -d &

# Set default environment to "dev" if not specified
ENV ?= dev

down:
	docker compose down

logs:
	docker compose logs web -f &
