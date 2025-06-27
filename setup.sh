#!/bin/bash
set -e

# Create .env file for frontend
echo "REACT_APP_API_BASE_URL=http://localhost:4000/api" > frontend/.env

# Start containers and build
docker compose up --build -d

# Wait for backend container to be ready for commands
echo "Waiting for backend to start..."
until docker exec nacif-backend-1 sh -c "mix ecto.create --quiet && mix ecto.migrate --quiet"; do
  sleep 2
done

# Run migrations
docker exec nacif-backend-1 mix ecto.migrate

# Run seeds
docker exec nacif-backend-1 mix run priv/repo/seeds.exs

echo "Setup finished!"