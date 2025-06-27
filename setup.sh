#!/bin/bash
set -e

# Sobe os containers e faz build
docker compose up --build -d

# Aguarda o container backend estar pronto para aceitar comandos
echo "Aguardando o backend iniciar..."
until docker exec nacif-backend-1 sh -c "mix ecto.create --quiet && mix ecto.migrate --quiet"; do
  sleep 2
done

# Executa as migrations
docker exec nacif-backend-1 mix ecto.migrate

# Executa as seeds
docker exec nacif-backend-1 mix run priv/repo/seeds.exs

echo "Setup finalizado!"