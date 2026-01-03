---
date: 2025-04-12
author: Guilherme Rossi Kirsten
tags: [Docker, Containers, Comandos, CLI]
---

# Manipulando Containers Docker

Guia completo de comandos essenciais para gerenciar e manipular containers Docker no dia a dia.

## Executando o Primeiro Container

Para verificar se o Docker está instalado corretamente, execute:

```bash
docker run hello-world
```

Este comando baixa a imagem `hello-world` (se ainda não estiver no seu sistema) e executa um container que exibe uma mensagem de confirmação.

## Nomeando Containers e Entendendo Diferentes Execuções

### Executando um Container com um Nome Personalizado

Por padrão, o Docker atribui nomes aleatórios aos containers. Você pode especificar um nome usando a flag `--name`:

```bash
docker run --name mynginx nginx
```

### Executando um Container em Segundo Plano (`-d`)

Para executar um container em modo "detached" (segundo plano), use a flag `-d`:

```bash
docker run -d --name mynginx nginx
```

### Mapeando Portas com a Flag `-p`

Para mapear a porta do container para a porta do host, use `-p`:

```bash
docker run -d -p 8080:80 nginx
```

Isso mapeia a porta `80` do container para a porta `8080` do host.

## Parando, Iniciando e Removendo Containers

### Listando Containers em Execução e Parados

Containers em execução:

```bash
docker ps
```

Todos os containers (incluindo parados):

```bash
docker ps -a
```

### Parando um Container

```bash
docker stop mynginx
```

### Iniciando um Container Parado

```bash
docker start mynginx
```

### Removendo um Container

Remoção normal:

```bash
docker rm mynginx
```

Remoção forçada (para containers em execução):

```bash
docker rm -f mynginx
```

## Attach e Detach

### Conectando-se a um Container em Execução (`docker attach`)

```bash
docker attach mynginx
```

Este comando conecta seu terminal ao processo principal do container.

### Saindo do Container sem Parar (`CTRL + P`, `CTRL + Q`)

Para sair do modo `attach` sem parar o container, pressione `CTRL + P` seguido de `CTRL + Q`.

## Executando Comandos e Removendo Containers Automaticamente

### Executando Comandos em um Novo Container

```bash
docker run nginx ls -la
```

Isto executa `ls -la` no container `nginx` e exibe o resultado no seu terminal.

### Entrando no Container com Bash

```bash
docker run -it nginx bash
```

Isto inicia um container `nginx` e abre uma sessão interativa do `bash`.

### Diferença entre `docker run` e `docker exec`

- `docker run`: Cria e inicia um novo container.
- `docker exec`: Executa um comando em um container já em execução.

Exemplo com `docker exec`:

```bash
docker exec -it mynginx bash
```

### Removendo Containers Automaticamente (`--rm`)

```bash
docker run --rm nginx ls -la
```

## Removendo Todos os Containers com Subcomandos

Para remover todos os containers parados:

```bash
docker rm $(docker ps -a -q)
```

Para remover todos os containers, incluindo os em execução, use:

```bash
docker rm -f $(docker ps -a -q)
```

## Publicação de Portas

Para executar um servidor Nginx em um container e publicar a porta:

```bash
docker run -d -p 8080:80 nginx
```

Agora, o Nginx está acessível em `http://localhost:8080`.

## Execução Interativa e Acesso ao Shell

### Acessando o Shell de um Container com `docker exec -it`

Se você já tem um container em execução e deseja acessar seu shell:

```bash
docker exec -it mynginx bash
```

### Diferença entre `docker exec` e `docker attach`

- `docker exec`: Executa um novo processo dentro de um container em execução (ex.: abrir uma nova sessão bash).
- `docker attach`: Anexa seu terminal ao processo principal do container (ex.: ver logs em tempo real).

## Resumo dos Comandos

### Executar um container

```bash
docker run [opções] imagem [comando]
```

### Listar containers

```bash
docker ps        # Em execução
docker ps -a     # Todos
```

### Parar, iniciar e remover containers

```bash
docker stop <nome|id>
docker start <nome|id>
docker rm <nome|id>
docker rm -f <nome|id>   # Forçado
```

### Executar comandos em containers

```bash
docker exec -it <nome|id> <comando>
```

### Acessar shell bash

```bash
docker exec -it <nome|id> bash
```

### Remover todos os containers

```bash
docker rm $(docker ps -a -q)
docker rm -f $(docker ps -a -q)   # Incluindo em execução
```
