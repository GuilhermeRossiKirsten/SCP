---
date: 2025-06-18
author: Guilherme Rossi Kirsten
tags: [Docker, Imagens, Registry, Docker Hub]
---

# Imagens Docker

Imagens Docker são pacotes imutáveis que contêm tudo o que é necessário para executar uma aplicação, servindo como modelo para criar containers.

## Entendendo Imagens Docker

### O que São Imagens e Como Elas Funcionam

Uma **imagem Docker** é um pacote imutável que contém tudo o que é necessário para executar uma aplicação: código, bibliotecas, dependências, ferramentas e configurações. As imagens são usadas para criar containers, que são instâncias em execução dessas imagens.

As imagens atuam como um modelo ou snapshot de um sistema de arquivos. Quando você executa um container, ele é iniciado a partir de uma imagem específica.

### Conceito de Camadas em Imagens Docker

As imagens Docker são construídas em camadas. Cada instrução em um Dockerfile (quando criamos imagens personalizadas) cria uma nova camada na imagem. Embora não estejamos cobrindo a criação de imagens personalizadas neste tutorial, é importante entender que as imagens são compostas por múltiplas camadas empilhadas.

Essas camadas são compartilhadas entre imagens, o que economiza espaço em disco e acelera downloads. Por exemplo, se duas imagens compartilham a mesma camada base, essa camada é baixada apenas uma vez.

### Imagens Oficiais vs. Imagens de Terceiros

- **Imagens Oficiais**: São mantidas pela equipe Docker ou pela comunidade e são consideradas confiáveis. Elas geralmente são encontradas no Docker Hub sem um nome de usuário, por exemplo, `nginx`, `redis`, `mysql`.
- **Imagens de Terceiros**: Criadas e mantidas por usuários individuais ou organizações. Elas podem ter personalizações específicas. O nome da imagem geralmente inclui o nome de usuário ou organização, por exemplo, `usuario/imagem-personalizada`.

## Gerenciamento de Imagens

### Listando Imagens Locais com `docker images`

Para ver todas as imagens Docker armazenadas localmente em seu sistema, use:

```bash
docker images
```

Este comando exibirá uma lista com:

- **REPOSITORY**: Nome do repositório ou imagem.
- **TAG**: Tag da imagem, que geralmente indica a versão.
- **IMAGE ID**: Identificador único da imagem.
- **CREATED**: Quando a imagem foi criada.
- **SIZE**: Tamanho da imagem.

### Removendo Imagens com `docker rmi`

Para remover uma imagem que você não precisa mais, use:

```bash
docker rmi [OPTIONS] IMAGE [IMAGE...]
```

Exemplo:

```bash
docker rmi nginx
```

**Nota**: Você não pode remover uma imagem que está sendo usada por um container em execução. Será necessário parar e remover o container primeiro.

### Inspecionando Imagens com `docker inspect`

Para obter detalhes sobre uma imagem específica, use:

```bash
docker inspect [OPTIONS] NAME|ID [NAME|ID...]
```

Exemplo:

```bash
docker inspect nginx
```

Isso retornará um objeto JSON com informações detalhadas sobre a imagem, como:

- **ID da Imagem**
- **Tags**
- **Camadas (Layers)**
- **Variáveis de Ambiente**
- **Comando de Entrada (Entrypoint)**
- **Volumes**

Você pode filtrar informações específicas usando a flag `--format`. Por exemplo, para obter apenas o ID da imagem:

```bash
docker inspect --format='{{.Id}}' nginx
```

## Trabalhando com Registries

### Introdução ao Docker Hub e Outros Registries

Um **registry** é um serviço onde as imagens Docker são armazenadas e distribuídas. O **Docker Hub** é o registry público oficial, mantido pela Docker, onde milhões de imagens estão disponíveis.

Outros registries populares incluem:

- **Amazon Elastic Container Registry (ECR)**
- **Google Container Registry (GCR)**
- **Azure Container Registry (ACR)**
- **Registries Privados**: Empresas podem hospedar seus próprios registries para imagens internas.

### Buscando e Fazendo Pull de Imagens com `docker pull`

Para buscar uma imagem no Docker Hub, você pode usar o comando `docker search`:

```bash
docker search ubuntu
```

Para baixar (fazer pull) de uma imagem, use:

```bash
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

Exemplo:

```bash
docker pull nginx
```

Isso baixará a imagem `nginx` com a tag `latest` (padrão). Para especificar uma tag:

```bash
docker pull nginx:1.21
```

### Diferença entre `docker pull` e Download Automático com `docker run`

- **`docker pull`**: Apenas baixa a imagem para o seu sistema local. Use quando você deseja apenas obter a imagem sem executá-la imediatamente.
- **`docker run`**: Se a imagem especificada não estiver presente localmente, o Docker automaticamente faz o pull da imagem antes de executá-la.

Exemplo:

```bash
docker run nginx
```

Se você ainda não tiver a imagem `nginx` localmente, o Docker fará o download e, em seguida, iniciará um container a partir dessa imagem.

## Comandos Úteis

### Uso de `docker image prune` para Limpeza de Recursos Não Utilizados

Com o tempo, você pode acumular imagens não utilizadas que ocupam espaço em disco. Para remover imagens dangling (imagens que não estão associadas a nenhuma tag):

```bash
docker image prune
```

Para remover **todas** as imagens não utilizadas (imagens não referenciadas por nenhum container), use:

```bash
docker image prune -a
```

**Atenção**: Use o parâmetro `-a` com cuidado, pois ele removerá todas as imagens não utilizadas, mesmo que você possa precisar delas no futuro.

### Remoção de Múltiplas Imagens ao Mesmo Tempo

Você pode remover várias imagens especificando seus IDs ou nomes:

```bash
docker rmi imagem1 imagem2 imagem3
```

Ou usando um comando para listar e remover:

```bash
docker rmi $(docker images -q)
```

Esse comando removerá todas as imagens listadas por `docker images -q`, que retorna apenas os IDs das imagens.

### Comandos Avançados para Gerenciamento Eficiente

#### Filtrando Imagens

Você pode filtrar as imagens listadas com `docker images` usando a flag `--filter` ou `-f`.

Exemplo: Listar imagens antes de uma determinada data:

```bash
docker images --filter before=nginx:1.19
```

#### Verificar o Espaço em Disco Usado pelo Docker

Para verificar quanto espaço em disco o Docker está utilizando:

```bash
docker system df
```

#### Limpar Recursos Não Utilizados

Para liberar espaço removendo containers parados, imagens não utilizadas, volumes não utilizados e networks não referenciadas:

```bash
docker system prune
```

## Docker Hub

### Recursos do Docker Hub

O Docker Hub oferece vários recursos que facilitam o gerenciamento e distribuição de imagens.

#### Criação de Conta e Namespace

- Qualquer pessoa pode criar uma conta gratuita no Docker Hub.
- Ao criar uma conta, você obtém um **namespace** exclusivo (geralmente seu nome de usuário).
- Esse namespace é usado como prefixo para todas as imagens que você criar e enviar para o Docker Hub.
- Exemplo: Se seu nome de usuário é `joaosilva`, suas imagens terão o formato `joaosilva/nome-da-imagem`.

#### Imagens Oficiais, Verificadas e de Comunidade

- **Imagens Oficiais**: Mantidas pela equipe Docker ou pela comunidade, sem namespace no nome. Exemplo: `nginx`, `mysql`.
- **Imagens Verificadas**: Criadas por fornecedores de software e verificadas pelo Docker. Elas possuem um selo de verificação e garantias adicionais de segurança e suporte.
- **Imagens de Comunidade**: Criadas por usuários do Docker Hub. Podem ser úteis, mas é importante verificar a confiabilidade do mantenedor.

#### Organização de Tags

- As imagens podem ter várias **tags** que geralmente representam diferentes versões ou variações.
- A tag padrão é `latest`, mas é recomendável especificar uma tag específica para garantir consistência.
- Exemplo: `nginx:1.21` refere-se à versão 1.21 do Nginx.

#### Aspectos de Segurança e SBOM

- **SBOM (Software Bill of Materials)**: Muitas imagens verificadas fornecem um SBOM, que é uma lista detalhada de todos os componentes e dependências incluídos na imagem.
- O SBOM ajuda na transparência e segurança, permitindo que os usuários conheçam exatamente o que está dentro da imagem.
- Imagens verificadas passam por verificações adicionais de segurança, incluindo varreduras de vulnerabilidades.

#### Repositórios Públicos e Privados

- **Repositórios Públicos**: Qualquer pessoa pode acessar e baixar as imagens.
- **Repositórios Privados**: Acesso restrito; requer autenticação. Útil para armazenar imagens internas ou confidenciais.

#### Automação de Builds

O Docker Hub pode ser integrado a repositórios de código (como GitHub ou Bitbucket) para automatizar o processo de build de imagens quando há novas alterações no código.

#### Webhooks e Integração com CI/CD

Webhooks podem ser configurados para notificar serviços externos quando eventos ocorrem no Docker Hub, como quando uma nova imagem é enviada. Isso facilita a integração com pipelines de CI/CD.

#### Visualização de Histórico de Builds e Tags

O Docker Hub mantém um histórico de builds e permite que você gerencie as diferentes tags de suas imagens, facilitando o controle de versões e atualizações.
