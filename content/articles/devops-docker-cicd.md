---
date: 2025-12-30
author: Guilherme Rossi Kirsten
tags: [DevOps, Docker, CI/CD, Containers, Automação]
---

# DevOps: Automatizando Deploy com Docker e CI/CD aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

Automatizar o processo de deploy é essencial para equipes ágeis. Neste artigo, vamos explorar como criar um pipeline eficiente usando Docker e GitHub Actions.

## Por Que Docker?

Docker resolve o clássico problema "funciona na minha máquina" ao garantir que o ambiente de desenvolvimento seja idêntico ao de produção.

### Dockerfile Básico

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Expor porta
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
```

### Multi-stage Builds

Para otimizar o tamanho da imagem:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## Docker Compose

Orquestre múltiplos containers facilmente:

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://db:5432/myapp
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

## GitHub Actions CI/CD

Automatize testes, build e deploy:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run linter
        run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: myapp:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            docker pull myapp:latest
            docker-compose up -d
```

## Boas Práticas

### 1. Use .dockerignore

```
node_modules
npm-debug.log
.git
.env
*.md
```

### 2. Variáveis de Ambiente

Nunca coloque secrets no código:

```bash
# .env
DATABASE_URL=postgresql://localhost:5432/myapp
JWT_SECRET=your-secret-key
API_KEY=your-api-key
```

### 3. Health Checks

Adicione health checks ao Docker:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1
```

### 4. Logging

Configure logs adequadamente:

```yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## Monitoramento

Implemente observabilidade:

```javascript
const express = require("express");
const app = express();

// Endpoint de saúde
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Métricas
app.get("/metrics", (req, res) => {
  res.json({
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    uptime: process.uptime(),
  });
});
```

## Rollback Strategy

Sempre tenha um plano de rollback:

```bash
# Tag da versão anterior
docker tag myapp:latest myapp:backup

# Deploy nova versão
docker pull myapp:latest
docker-compose up -d

# Se houver problemas, rollback
docker tag myapp:backup myapp:latest
docker-compose up -d
```

## Conclusão

Um pipeline de CI/CD bem configurado economiza tempo, reduz erros e aumenta a confiança no processo de deploy. Comece simples e evolua gradualmente conforme as necessidades do projeto.

**Próximos passos:**

- Implemente testes automatizados
- Configure monitoramento com Prometheus/Grafana
- Adicione blue-green deployment
- Explore Kubernetes para orquestração avançada

A automação é um investimento que se paga rapidamente em produtividade e qualidade.
