# Define the list of environments to deploy
ENVIRONMENTS := dev prod

.PHONY: $(ENVIRONMENTS)

# Pattern rule to deploy environment-specific containers
$(ENVIRONMENTS):
	docker compose -f docker-compose.yml -f docker-compose.$@.yml build --no-cache

# Target to start environment-specific images
start:
	docker compose -f docker-compose.yml -f docker-compose.$(ENV).yml up -d &

# Set default environment to "dev" if not specified
ENV ?= dev

down:
	docker compose -f docker-compose.yml -f docker-compose.$(ENV).yml down

logs:
	docker compose logs web -f &

studio:
	docker compose exec web npx prisma studio --hostname=0.0.0.0

seed:
	docker compose exec web npx prisma db seed

push:
	docker compose exec web npx prisma db push

