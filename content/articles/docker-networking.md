---
date: 2025-09-30
author: Guilherme Rossi Kirsten
tags: [Docker, Networking, Bridge, Host, DevOps]
---

# Docker Networking

O Docker fornece um sistema de rede completo que permite conectar containers entre si e com o mundo externo, essencial para desenvolver aplicações distribuídas e escaláveis.

## Introdução ao Docker Networking

O Docker fornece um sistema de rede completo que permite conectar containers entre si e com o mundo externo. Compreender como o Docker lida com redes é essencial para desenvolver aplicações distribuídas e escaláveis.

## Conceitos Básicos de Rede no Docker

### Tipos de Redes no Docker

O Docker oferece vários tipos de redes, mas os mais comuns são:

#### Bridge (Ponte)

- Rede padrão para containers independentes.
- Fornece isolamento entre containers e o host.
- Containers na mesma rede bridge personalizada podem se comunicar entre si por nome.

#### Host

- O container compartilha a interface de rede com o host.
- Útil para casos onde o desempenho é crítico ou quando o container precisa ouvir em portas privilegiadas.
- **Nota**: No macOS e Windows, o modo de rede `host` tem limitações. No Docker Desktop, essa opção pode ser habilitada, mas é recomendado usar o modo `bridge` para maior compatibilidade.

### Como os Containers se Conectam às Redes

- **Interfaces Virtuais**: O Docker cria interfaces de rede virtuais para cada container.
- **Endereços IP**: Cada container recebe um endereço IP privado dentro da rede à qual está conectado.
- **Resolução de Nomes**: Em redes bridge personalizadas, o Docker configura um serviço de DNS interno para resolução de nomes de containers.

## Comunicação entre Containers na Mesma Rede

### Exemplo Prático: Aplicação Node.js e MongoDB

Vamos criar uma aplicação Node.js que se comunica com um banco de dados MongoDB, ambos executando em containers Docker.

### Passo 1: Preparar a Aplicação Node.js

**Arquivo `index.js`:**

```javascript
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://db:27017/test")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
```

- A aplicação tenta conectar-se ao MongoDB no host `db` na porta `27017`.
- O nome `db` será resolvido dentro da rede Docker personalizada.

### Passo 2: Criar o Dockerfile

**Arquivo `Dockerfile`:**

```dockerfile
FROM node:lts-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]
```

- Utilizamos a imagem `node:lts-alpine` para um container leve.
- Instalamos as dependências e copiamos o código da aplicação.

### Passo 3: Criar o .dockerignore

**Arquivo `.dockerignore`:**

```
node_modules
```

- Evita copiar a pasta `node_modules` local para o container.

### Passo 4: Construir a Imagem Docker

```bash
docker build -t mynode_app_network .
```

- Constrói a imagem e a nomeia como `mynode_app_network`.

### Passo 5: Criar uma Rede Bridge Personalizada

```bash
docker network create app-network
```

- Cria uma rede chamada `app-network`.

### Passo 6: Iniciar o Container do MongoDB

```bash
docker run -d --name db --network app-network mongo:latest
```

- Inicia o MongoDB na rede `app-network` com o nome `db`.

### Passo 7: Iniciar o Container da Aplicação Node.js

```bash
docker run -d --name app --network app-network mynode_app_network
```

- Inicia a aplicação Node.js na mesma rede `app-network`.

### Passo 8: Verificar a Comunicação entre os Containers

- Verifique os logs da aplicação:
  ```bash
  docker logs app
  ```
- Você deverá ver a mensagem:
  ```
  Connected to MongoDB
  ```
- Isso confirma que a aplicação Node.js conseguiu resolver o nome `db` e conectar-se ao MongoDB.

## Comunicação entre Containers e o Host

Às vezes, um container precisa acessar um serviço que está rodando no host. Vamos ver como fazer isso usando `host.docker.internal`.

### Utilizando `host.docker.internal`

- `host.docker.internal` é um hostname especial que resolve para o endereço IP do host.
- **Nota**: No Linux, `host.docker.internal` não está disponível por padrão. Porém, a partir do Docker 20.10, podemos usar o placeholder `host-gateway`.

### Exemplo Prático: Acessando um Serviço no Host a partir de um Container

#### Passo 1: Preparar a Aplicação Node.js no Host

Crie uma aplicação Node.js simples no host que escuta na porta 3000.

**Arquivo `app_host.js`:**

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the Host");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("App listening on port 3000");
});
```

Inicie a aplicação:

```bash
node app_host.js
```

Teste no host:

```bash
curl http://localhost:3000
# Deverá retornar: Hello from the Host
```

#### Passo 2: Iniciar um Container Nginx e Acessar o Serviço do Host

Inicie o container do Nginx, adicionando `host.docker.internal` ao `/etc/hosts` do container.

```bash
docker run -d --name nginx --add-host=host.docker.internal:host-gateway nginx
```

- O `host-gateway` é resolvido automaticamente pelo Docker para o endereço IP do host.

#### Passo 3: Testar a Conexão a partir do Container

Entre no container do Nginx:

```bash
docker exec -it mynginx sh
```

Teste a conexão com o serviço no host:

```bash
curl http://host.docker.internal:3000
```

- Você deverá ver:
  ```
  Hello World
  ```

#### Passo 4: Verificar a Configuração da Rede

Inspecione a rede `bridge`:

```bash
docker network inspect bridge
```

- Verifique o gateway e certifique-se de que o `host-gateway` está sendo resolvido corretamente.

## Gerenciando Múltiplas Redes e Isolamento

É possível conectar um container a mais de uma rede, permitindo comunicação seletiva entre serviços.

### Criando e Conectando Containers a Múltiplas Redes

#### Passo 1: Criar Redes Personalizadas

```bash
docker network create backend-net
docker network create db-net
```

#### Passo 2: Iniciar os Containers nas Redes Apropriadas

Inicie o container do MongoDB na rede `db-net`:

```bash
docker run -d --name db --network db-net mongo:latest
```

Inicie o container da aplicação Node.js na rede `backend-net`:

```bash
docker run -d --name app --network backend-net mynode_app_network
```

#### Passo 3: Verificar que a Aplicação Não Consegue Conectar ao MongoDB

Verifique os logs da aplicação:

```bash
docker logs app
```

Você deverá ver um erro de conexão, pois a aplicação não consegue resolver o nome `db`.

#### Passo 4: Conectar o Container da Aplicação à Rede `db-net`

Conecte o container `app` também à rede `db-net`:

```bash
docker network connect db-net app
```

Agora, o container `app` está conectado a duas redes: `backend-net` e `db-net`.

#### Passo 5: Verificar que a Aplicação Consegue Conectar ao MongoDB

Verifique novamente os logs da aplicação:

```bash
docker logs app
```

Você deverá ver:

```
Connected to MongoDB
```

### Exemplo Prático: Isolamento de Serviços com Redes Personalizadas

- **Objetivo**: Isolar o acesso ao MongoDB, permitindo que apenas a aplicação Node.js se conecte a ele.
- **Benefício**: Melhora a segurança, evitando que outros containers acessem o banco de dados inadvertidamente.

## Modos de Rede: Bridge vs. Host

### Modo Bridge (Padrão)

- **Recomendado**: Fornece isolamento entre containers e do host.
- **Comunicação entre Containers**: Através de redes bridge personalizadas, com resolução de nomes automática.
- **Compatibilidade**: Funciona de forma consistente em Linux, macOS e Windows.

### Modo Host

- **Funcionamento**: O container compartilha a interface de rede do host.
- **Uso no Linux**:
  ```bash
  docker run -d --network host mynode_app_network
  ```
- **Considerações**:
  - **Desempenho**: Pode melhorar o desempenho em aplicações que requerem alta taxa de transferência de rede.
  - **Portas**: Não é necessário mapear portas; o container usa as mesmas portas do host.
  - **Segurança**: Menos isolado; pode representar riscos se não for usado corretamente.
- **Uso no macOS e Windows**:
  - O suporte ao modo `host` no Docker Desktop está disponível, mas pode ter limitações.
  - **Recomendação**: Prefira usar o modo `bridge` para maior compatibilidade.
