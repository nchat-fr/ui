build:
	docker compose build

up:
	docker compose up -d ui

down:
	docker compose down

shell:
	docker compose up -d ui && \
	docker compose exec -it ui bash

logs:
	docker-compose logs -f ui