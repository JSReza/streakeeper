# Streakeeper Mock Backend

This backend provides a simple Express API for the Streakeeper frontend.

## Run locally

1. Install dependencies:

```bash
cd mock-backend
npm install
```

2. Start the server:

```bash
npm start
```

3. By default the server runs on port 3000. To override the port:

```bash
PORT=4000 npm start
```

## Development

```bash
npm run dev
```

## Environment variables

- `PORT` — port to run the server on (default: `3000`)
- `CORS_ORIGIN` — optional CORS origin for cross-site requests (default: `*`)
- `DATA_FILE` — optional file path for storing `users` and `habits` data

## Deployment

This project includes a `Dockerfile` for containerized deployment.

Build and run locally:

```bash
docker build -t streakeeper-backend .
docker run -p 3000:3000 streakeeper-backend
```

If you deploy to a host that provides a writable filesystem, ensure `DATA_FILE` points to a writable path if you do not want to use `data.json` in the project root.
