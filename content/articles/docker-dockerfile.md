---
date: 2025-08-24
author: Guilherme Rossi Kirsten
tags: [Docker, Dockerfile, Build, Multi-stage, DevOps]
---

# Dockerfile: Criando Imagens Docker Personalizadas

Dockerfile é um script que contém uma série de instruções para construir uma imagem Docker, definindo todos os componentes necessários para executar sua aplicação.

## Introdução ao Docker e Dockerfile

O Docker é uma plataforma que permite empacotar, distribuir e executar aplicações em containers, garantindo que elas funcionem de maneira consistente em diferentes ambientes. Um **Dockerfile** é um script que contém uma série de instruções para construir uma imagem Docker. Ele define todos os componentes necessários para executar sua aplicação, desde a imagem base até as dependências e configurações.

## Estrutura Básica de um Dockerfile

Vamos começar analisando um Dockerfile para uma aplicação Node.js:

```dockerfile
ARG NODE_VERSION=21.1.0
FROM node:${NODE_VERSION}

RUN apt-get update \
    && apt-get install -y vim \
    && rm -rf /var/lib/apt/lists/*

ENV PORT=3001
ENV MESSAGE="Hello Docker!"

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
    CMD [ "curl","-f","http://localhost:3001" ]

EXPOSE 3001
CMD ["node", "index.js"]
```

Este Dockerfile contém várias instruções importantes que exploraremos em detalhes a seguir.

## Instruções Detalhadas do Dockerfile

### FROM e ARG

- **FROM**: Especifica a imagem base a partir da qual sua imagem será construída.
  ```dockerfile
  FROM node:${NODE_VERSION}
  ```
- **ARG**: Define variáveis de build que podem ser passadas durante a construção da imagem.
  ```dockerfile
  ARG NODE_VERSION=21.1.0
  ```

**Explicação:**

- Estamos usando o **ARG** `NODE_VERSION` para permitir a parametrização da versão do Node.js. Isso facilita a atualização ou alteração da versão sem modificar o Dockerfile.
- **Uso durante o build:**
  ```bash
  docker build --build-arg NODE_VERSION=16.13.0 -t my-node-app .
  ```

### RUN

- Executa comandos durante a construção da imagem.
  ```dockerfile
  RUN apt-get update \
      && apt-get install -y vim \
      && rm -rf /var/lib/apt/lists/*
  ```

**Explicação:**

- **apt-get update**: Atualiza a lista de pacotes disponíveis.
- **apt-get install -y vim**: Instala o editor `vim`. Isso pode ser útil para depuração dentro do container, mas em ambientes de produção, recomenda-se minimizar a instalação de pacotes adicionais para reduzir o tamanho da imagem.
- **rm -rf /var/lib/apt/lists/**: Remove os arquivos de lista de pacotes para reduzir o tamanho da imagem.

### ENV

- Define variáveis de ambiente que estarão disponíveis no container em tempo de execução.
  ```dockerfile
  ENV PORT=3001
  ENV MESSAGE="Hello Docker!"
  ```

**Explicação:**

- **PORT** e **MESSAGE** são usadas pela aplicação para configurar a porta de escuta e a mensagem a ser exibida.

### WORKDIR

- Define o diretório de trabalho dentro do container.
  ```dockerfile
  WORKDIR /app
  ```

**Explicação:**

- Define `/app` como o diretório onde os comandos subsequentes serão executados, facilitando o gerenciamento dos arquivos da aplicação.

### COPY e Reaproveitamento de Cache

- **COPY**: Copia arquivos do sistema host para o sistema de arquivos do container.
  ```dockerfile
  COPY package*.json ./
  RUN npm install
  COPY . .
  ```

**Estratégia para Reaproveitamento de Cache:**

- **Por que copiar primeiro o `package*.json` antes do restante do código?**
  - Ao copiar apenas os arquivos de dependência (`package.json` e `package-lock.json`) e executar `npm install`, o Docker pode armazenar em cache esta camada.
  - Se o código da aplicação mudar, mas as dependências permanecerem as mesmas, o Docker reutilizará o cache desta camada, acelerando o processo de build.

**Exemplo:**

- **Etapa 1:** Copia os arquivos de dependência.
  ```dockerfile
  COPY package*.json ./
  ```
- **Etapa 2:** Instala as dependências.
  ```dockerfile
  RUN npm install
  ```
- **Etapa 3:** Copia o restante do código.
  ```dockerfile
  COPY . .
  ```

### Uso do .dockerignore

Crie um arquivo `.dockerignore` para excluir arquivos e diretórios desnecessários do contexto de build.

**Exemplo de .dockerignore:**

```
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
```

**Explicação:**

- **node_modules**: Evita copiar dependências já instaladas, garantindo que elas sejam instaladas dentro do container.
- **Dockerfile e .dockerignore**: Não são necessários dentro da imagem.
- **.git**: Exclui os arquivos de controle de versão.

### CMD e ENTRYPOINT

#### CMD

- Define o comando padrão a ser executado quando um container é iniciado a partir da imagem.
  ```dockerfile
  CMD ["node", "index.js"]
  ```

#### ENTRYPOINT

- Define o executável padrão do container que não é facilmente sobrescrito.

**Diferença entre CMD e ENTRYPOINT:**

- **CMD** pode ser sobrescrito ao passar um comando no `docker run`.
- **ENTRYPOINT** é fixo e qualquer argumento passado será adicionado após o ENTRYPOINT.

**Exemplo na Aplicação Go:**

No Dockerfile da aplicação Go:

```dockerfile
FROM scratch
USER 1001
COPY --from=builder /app/server /server
ENTRYPOINT ["./server"]
```

**Explicação:**

- **ENTRYPOINT ["./server"]**: Define o executável principal do container.
- Ao executar `docker run my-go-app`, o container executará `./server`.
- Se passarmos argumentos, por exemplo `docker run my-go-app 8080`, o container executará `./server 8080`.

### USER e Segurança

- Define o usuário sob o qual os processos dentro do container serão executados.
  ```dockerfile
  RUN useradd -m mynode
  RUN chown -R mynode /app
  USER mynode
  ```

**Explicação:**

- **useradd**: Cria um novo usuário `mynode`.
- **chown**: Altera a propriedade dos arquivos para o usuário `mynode`.
- **USER mynode**: Define que os comandos subsequentes e o processo principal serão executados como `mynode`.
- **Nota:** Estas linhas estão comentadas no Dockerfile fornecido. Para melhorar a segurança, recomenda-se descomentá-las e usar um usuário não root.

### HEALTHCHECK

- Permite que o Docker verifique a saúde do container em intervalos regulares.
  ```dockerfile
  HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
      CMD [ "curl","-f","http://localhost:3001" ]
  ```

**Explicação:**

- **--interval=10s**: Verifica a cada 10 segundos.
- **--timeout=5s**: Timeout de 5 segundos para cada tentativa.
- **--start-period=5s**: Aguarda 5 segundos antes de iniciar as verificações.
- **--retries=3**: Considera o container unhealthy após 3 falhas consecutivas.
- **CMD [ "curl","-f","http://localhost:3001" ]**: Executa o comando para verificar se a aplicação está respondendo.

**Correção:**

- Certifique-se de que o comando `curl` está disponível na imagem. Se estiver usando uma imagem mínima que não inclui `curl`, você pode usar o comando `wget` ou um script em `sh`.

### EXPOSE

- Documenta a porta em que a aplicação estará escutando.
  ```dockerfile
  EXPOSE 3001
  ```

**Explicação:**

- **EXPOSE** não publica a porta, apenas documenta. Para publicar a porta, você deve usar o `-p` ou `-P` ao executar o container.

### VOLUME

- Declara um volume que deve ser montado em um diretório específico.
  ```dockerfile
  VOLUME [ "/data" ]
  ```

**Explicação:**

- Esta linha está comentada. Se sua aplicação precisa persistir dados, você pode descomentá-la para criar um volume em `/data`.

### LABEL

- Adiciona metadados à imagem.
  ```dockerfile
  LABEL maintainer="Wesley Willians"
  ```

**Explicação:**

- Ajuda na documentação e manutenção da imagem, permitindo que informações sejam recuperadas com `docker inspect`.

## Multi-stage Builds e Otimização de Imagens

O Docker permite otimizar suas imagens utilizando multi-stage builds, o que ajuda a reduzir o tamanho da imagem final, especialmente para linguagens compiladas como Go.

**Dockerfile da Aplicação Go:**

```dockerfile
FROM golang:latest AS builder

LABEL maintainer="Wesley Willians"

WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o server main.go

# Final stage
FROM scratch
USER 1001
COPY --from=builder /app/server /server
ENTRYPOINT ["./server"]
```

**Explicação:**

- **Primeiro Estágio (builder):**
  - Usa a imagem `golang:latest` que contém todas as ferramentas necessárias para compilar a aplicação.
  - Compila o binário estático com otimizações (`-ldflags="-s -w"` reduz o tamanho do binário).
- **Segundo Estágio (imagem final):**
  - Usa a imagem `scratch`, que é vazia, resultando em uma imagem muito pequena.
  - Copia apenas o binário compilado do estágio anterior.
  - Define o usuário e o entrypoint.

**Observação sobre Imagens Otimizadas:**

- **Imagens Alpine e Slim:**
  - Você pode usar `golang:alpine` ou `golang:slim` no primeiro estágio para reduzir ainda mais o tamanho da imagem de build.
  - Exemplo:
    ```dockerfile
    FROM golang:latest-alpine AS builder
    ```

**Benefícios:**

- **Redução de Tamanho:** A imagem final contém apenas o binário necessário para executar a aplicação.
- **Segurança:** Menor superfície de ataque, pois não inclui ferramentas desnecessárias.

## ONBUILD e Imagens Base Personalizadas

O **ONBUILD** permite que você adicione instruções ao Dockerfile que só serão executadas quando sua imagem for usada como imagem base para outra.

**Dockerfile.base:**

```dockerfile
ARG NODE_VERSION=21.1.0
FROM node:${NODE_VERSION}
WORKDIR /app

ONBUILD COPY package*.json ./
ONBUILD RUN npm install
ONBUILD COPY . .

CMD ["node", "index.js"]
```

**Dockerfile.child:**

```dockerfile
FROM wesleywillians/docker-node-base:latest
```

**Explicação:**

- **Dockerfile.base**:
  - Define uma imagem base personalizada com instruções **ONBUILD**.
  - Quando outra imagem usa esta imagem como base, as instruções **ONBUILD** são executadas.
- **Uso Prático:**
  - Facilita a padronização de ambientes em equipes ou projetos.

## Passando Variáveis e Argumentos no `docker run`

Você pode sobrescrever variáveis de ambiente e argumentos definidos no Dockerfile ao executar o container.

### Passando Variáveis de Ambiente com `-e`

```bash
docker run -e MESSAGE="Hello from Docker!" -e PORT=4000 -p 4000:4000 my-node-app
```

- **-e MESSAGE="Hello from Docker!"**: Define a variável de ambiente `MESSAGE`.
- **-e PORT=4000**: Define a variável de ambiente `PORT`.

### Passando Argumentos para o CMD ou ENTRYPOINT

**Aplicação Go:**

- O Dockerfile define:
  ```dockerfile
  ENTRYPOINT ["./server"]
  ```
- Para passar a porta como argumento:
  ```bash
  docker run -p 8080:8080 my-go-app 8080
  ```
- Isso executará `./server 8080`.

### Sobrescrevendo o ENTRYPOINT com `--entrypoint`

```bash
docker run --entrypoint /bin/sh my-go-app
```

- Permite executar um shell dentro do container.

### Especificando o Usuário com `-u`

```bash
docker run -u 1001 my-node-app
```

- Executa o container com o usuário de ID `1001`.

## Resumo e Melhores Práticas

- **Reaproveitamento de Cache:**
  - Copie os arquivos de dependência antes do código-fonte para maximizar o uso do cache.
- **Uso do .dockerignore:**
  - Exclua arquivos e diretórios desnecessários para reduzir o contexto de build.
- **CMD vs ENTRYPOINT:**
  - **CMD** pode ser sobrescrito e define comandos padrão.
  - **ENTRYPOINT** define o executável principal e é menos suscetível a ser sobrescrito.
- **Passando Variáveis e Argumentos:**
  - Use `-e` ou `--env` no `docker run` para passar variáveis de ambiente.
  - Passe argumentos diretamente para sobrescrever o **CMD**.
- **Multi-stage Builds:**
  - Utilize para reduzir o tamanho da imagem final.
  - Use imagens base otimizadas (e.g., `alpine`) no estágio de build quando apropriado.
- **HEALTHCHECK:**
  - Implemente um endpoint `/health` para verificar a saúde da aplicação.
  - Certifique-se de que as ferramentas usadas no HEALTHCHECK (e.g., `curl`) estão disponíveis na imagem.
- **Segurança com USER:**
  - Execute processos com usuários não root para melhorar a segurança.
- **LABEL e Metadados:**
  - Adicione labels para facilitar a manutenção e automação.
