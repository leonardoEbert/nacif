# Nacif Full Stack Code Challenge

## Requirements
- Docker
- Docker Compose

## How to Run

```bash
./setup.sh
```

This script will:
- Create a `.env` file inside the `frontend` directory with the following content:
  ```
  REACT_APP_API_BASE_URL=http://localhost:4000/api
  ```
- Start the containers for the database, backend (Elixir/Phoenix), and frontend (React)
- Run migrations and seeds automatically

The application will be available at:
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend (API):** [http://localhost:4000/api](http://localhost:4000/api)

## Project Structure

```
nacif/
├── backend/   # Elixir/Phoenix API + Ecto/Postgres
├── frontend/  # React application
├── docker-compose.yml
├── setup.sh
└── README.md
```

### Backend

- **Stack:** Elixir, Phoenix, Ecto, PostgreSQL
- **Main endpoints:** `/api/todos`, `/api/login`
- **Authentication:** JWT via `Authorization: Bearer <token>` header
- **Seeds:** Default user created automatically (email: `ricardo@nacif.xyz`, password: `nacif`)

#### Useful commands

```bash
# Run tests
docker exec nacif-backend-1 mix test

# Access Elixir console
docker exec -it nacif-backend-1 iex -S mix
```

### Frontend

- **Stack:** React, Typescript, Bootstrap
- **Environment variable:** `REACT_APP_API_BASE_URL` is already set in docker-compose to point to the backend

#### Scripts

```bash
# Run locally (outside docker)
cd frontend
npm install
npm start
```

## Authentication Flow

1. Log in with the default user.
2. The JWT token is saved in `sessionStorage` and sent with every authenticated request.
3. The frontend consumes the protected todos API.

## Notes

- The backend only accepts connections from the frontend via CORS.
- The database is persisted in a Docker volume.
- To reset the environment, just run:

```bash
docker compose down -v
./setup.sh
```

---

For any questions, open an issue or get in touch.
