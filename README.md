# SCP

Este projeto é uma aplicação web desenvolvida com Next.js, criada com o intuito de estudos sobre arquitetura de software, aplicando boas práticas de desenvolvimento, organização de código e integração entre diferentes camadas e serviços. Além disso, dentro deste projeto está incluído meu portfólio pessoal, que apresenta minhas experiências, habilidades, projetos e certificações de forma interativa e moderna.

O objetivo principal é explorar conceitos modernos de arquitetura, como separação de responsabilidades, uso de APIs REST, integração com serviços externos e automação de infraestrutura, além de proporcionar um ambiente para experimentação e aprendizado contínuo.

O sistema contempla funcionalidades como gerenciamento de usuários, controle de status, migrações de banco de dados, integração com APIs externas (ex: GitHub) e um frontend moderno e interativo. Todo o projeto foi estruturado visando escalabilidade, manutenibilidade e clareza, servindo como referência para quem deseja aprimorar conhecimentos em desenvolvimento web e arquitetura de sistemas.

## Funcionalidades

- **Sistema de Artigos/Blog:**
  - Galeria de artigos com filtros por busca e tags
  - Visualização de artigos em Markdown com syntax highlighting profissional (20+ linguagens)
  - Suporte a metadados (data, autor, tags) via frontmatter
  - Copy-to-clipboard nos blocos de código com feedback visual
  - Design responsivo e otimizado para leitura
  - API REST para listagem e consulta de artigos

## Endpoints da API

### Usuários

- `GET /api/v1/users` — Lista todos os usuários cadastrados.
- `POST /api/v1/users` — Cria um novo usuário.
  - Body esperado:
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string"
    }
    ```
- `GET /api/v1/users/[username]` — Consulta detalhes de um usuário específico.
- `PATCH /api/v1/users/[username]` — Atualiza dados de um usuário.
  - Body parcial, por exemplo:
    ```json
    {
      "email": "novo@email.com"
    }
    ```

### Status

- `GET /api/v1/status` — Retorna informações sobre o status da aplicação (saúde, versão, uptime, etc).

### Migrações

- `GET /api/v1/migrations` — Lista todas as migrações aplicadas no banco de dados.
- `POST /api/v1/migrations` — Aplica novas migrações.

### Sessões

- `POST /api/v1/sessions` — Cria uma nova sessão de autenticação (login).
  - Body esperado:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - Resposta:
    ```json
    {
      "id": "uuid",
      "token": "string",
      "user_id": "uuid",
      "expires_at": "ISO8601",
      "created_at": "ISO8601",
      "updated_at": "ISO8601"
    }
    ```
  - Utilização: Envie as credenciais do usuário para autenticação. Se válidas, retorna um token de sessão e informações da sessão. O token também é enviado como cookie HTTP Only.
  - Erros:
    - Se email ou senha estiverem incorretos, retorna status 401 e mensagem de erro padronizada.

### GitHub

- `GET /api/github/repos` — Retorna lista de repositórios do GitHub integrados/configurados.

### Artigos

- `GET /api/articles` — Lista todos os artigos publicados.

  - Query params opcionais:
    - `search`: Busca por título
    - `tag`: Filtra por tag específica
  - Resposta:
    ```json
    {
      "success": true,
      "data": [
        {
          "slug": "introducao-cpp-moderno",
          "title": "Introdução ao C++ Moderno",
          "description": "O C++ moderno trouxe mudanças...",
          "date": "2026-01-02",
          "author": "Guilherme Rossi Kirsten",
          "tags": ["C++", "Programação", "Performance"]
        }
      ],
      "count": 1
    }
    ```

- `GET /api/articles/[slug]` — Consulta artigo específico por slug.
  - Resposta:
    ```json
    {
      "success": true,
      "data": {
        "slug": "introducao-cpp-moderno",
        "title": "Introdução ao C++ Moderno",
        "description": "O C++ moderno trouxe mudanças...",
        "date": "2026-01-02",
        "author": "Guilherme Rossi Kirsten",
        "tags": ["C++", "Programação"],
        "content": "# Título\n\nConteúdo em Markdown..."
      }
    }
    ```

### Faker

- `GET /api/faker` — Retorna dados fictícios para testes e desenvolvimento.

## Home Page

A página inicial apresenta um portfólio moderno e interativo, destacando informações pessoais, habilidades, projetos, certificações, linha do tempo e formas de contato. Utiliza componentes visuais dinâmicos, como animações de partículas, parallax e cursor personalizado, proporcionando uma experiência atraente e responsiva.

## Artigos

Sistema completo de blog integrado ao portfólio:

- **Galeria**: `/articles` - Exibe todos os artigos com busca e filtros por tags
- **Visualização**: `/articles/[slug]` - Renderiza artigos em Markdown com syntax highlighting
- **Features**:

  - Parser Markdown customizado sem dependências externas
  - Syntax highlighting com Prism.js (JavaScript, TypeScript, Python, C++, Rust, Go, SQL, Docker, YAML, e mais)
  - Destaque especial para C++ (std::, templates, operators, headers, STL types)
  - Tema verde/escuro consistente com o design do site
  - Botão de copiar código com feedback visual
  - Filtros client-side por título e tags
  - Loading states e animações suaves
  - SEO-friendly com metadados dinâmicos
  - Typography otimizada para leitura

- **Gerenciamento de Usuários:**

  - Criação, consulta, atualização e listagem de usuários via API REST (`/app/api/v1/users`).
  - Suporte a rotas dinâmicas para operações específicas por usuário (`/app/api/v1/users/[username]`).

- **Status do Sistema:**

  - Endpoint para consulta do status da aplicação (`/app/api/v1/status`).
  - Página dedicada para exibir informações de status (`/app/status/page.tsx`).

- **Migrações:**

  - API para gerenciar e consultar migrações do banco de dados (`/app/api/v1/migrations`).
  - Scripts de migração localizados em `infra/migrations`.

- **Integração com APIs Externas:**

  - Integração com o GitHub para consulta de repositórios (`/app/api/github/repos`).
  - Endpoint de dados fictícios para testes (`/app/api/faker`).

- **Frontend Moderno:**

  - Componentes reutilizáveis para seções como sobre, certificações, contato, educação, projetos, habilidades, linha do tempo, etc. (diretório `components/`).
  - Sistema de artigos com componentes especializados:
    - `ArticlesFilters` - Busca e filtros por tags com debounce
    - `ArticleSkeleton` - Loading states elegantes
    - `FormattedDate` - Formatação de datas SSR-safe
    - `CodeBlock` - Blocos de código com botão copiar
  - Efeitos visuais interativos como parallax, partículas e cursor customizado.
  - Temas e estilização global via CSS (`app/globals.css`, `styles/globals.css`).
  - Syntax highlighting customizado com tema verde/escuro (`prism-theme.css`).

- **Infraestrutura:**

  - Arquivos de configuração para Docker Compose (`infra/compose.yaml`).
  - Scripts para inicialização e shutdown gracioso do banco de dados.
  - Gerenciamento de erros e utilitários para banco de dados.

- **Testes:**
  - Testes de integração para APIs principais localizados em `tests/integration/api/v1`.

## Estrutura de Pastas

- `app/` — Páginas, rotas de API e arquivos globais do Next.js.
  - `app/articles/` — Galeria e páginas de artigos individuais
  - `app/api/articles/` — Endpoints REST para sistema de artigos
- `components/` — Componentes React reutilizáveis para o frontend.
- `content/articles/` — Artigos em Markdown com frontmatter (data, autor, tags).
- `infra/` — Infraestrutura, banco de dados, scripts e migrações.
- `lib/` — Utilitários e funções auxiliares.
  - `lib/markdown.ts` — Parser Markdown customizado com syntax highlighting
- `models/` — Modelos de dados e lógica.
- `styles/` — Arquivos de estilos globais.
- `tests/` — Testes automatizados de integração.

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute as migrações do banco de dados (se necessário).
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse a aplicação em `http://localhost:3000`.

## Tecnologias Utilizadas

- **Frontend:**

  - Next.js 16
  - React 19
  - TypeScript
  - Tailwind CSS 4
  - Framer Motion (animações)
  - Prism.js (syntax highlighting)

- **Backend:**

  - Node.js
  - PostgreSQL
  - Docker

- **Qualidade:**
  - Jest (testes)
  - ESLint
  - Prettier
  - Husky (git hooks)
  - Commitizen (commits padronizados)

## Hospedagem

O projeto está hospedado na plataforma Vercel, garantindo alta performance e deploy contínuo. O domínio personalizado está configurado para `rossik.dev.br`, permitindo acesso público e seguro à aplicação.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
