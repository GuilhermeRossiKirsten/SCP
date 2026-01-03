---
date: YYYY-MM-DD
author: Seu Nome
tags: [Tag1, Tag2, Tag3]
---

# Título do Artigo: Template Completo de Markdown

Este é o primeiro parágrafo que será usado como descrição na galeria de artigos. Mantenha-o conciso e informativo (até 150 caracteres é ideal), explicando brevemente o que o leitor encontrará neste artigo.

## Introdução

Comece com uma introdução envolvente que prepare o leitor para o conteúdo. Este template demonstra **todos os recursos de Markdown** suportados no sistema de artigos do projeto.

## Formatação de Texto

### Ênfases Básicas

Você pode usar **negrito** para destacar informações importantes e _itálico_ para dar ênfase sutil. Também é possível combinar **_negrito e itálico_** ao mesmo tempo.

### Código Inline

Use `código inline` para mencionar comandos, variáveis, funções ou termos técnicos como `useState`, `async/await`, ou `docker-compose`.

### Links

Crie [links externos](https://github.com) ou [links internos](/articles) normalmente. O sistema adiciona automaticamente `target="_blank"` para links externos.

## Hierarquia de Títulos

# Título Nível 1 (H1) - Usado apenas para o título principal

## Título Nível 2 (H2) - Seções principais

### Título Nível 3 (H3) - Subseções

#### Título Nível 4 (H4) - Tópicos específicos

##### Título Nível 5 (H5) - Detalhes menores

###### Título Nível 6 (H6) - Notas ou observações

## Listas

### Listas Não Ordenadas

Use listas para enumerar itens sem ordem específica:

- Primeiro item da lista
- Segundo item da lista
- Terceiro item da lista
  - Subitem aninhado nível 1
  - Outro subitem
    - Subitem aninhado nível 2
    - Mais um subitem profundo
- Voltando ao nível principal

### Listas Ordenadas

Para sequências ou passos:

1. Primeiro passo do processo
2. Segundo passo do processo
3. Terceiro passo do processo
   1. Sub-passo A
   2. Sub-passo B
4. Quarto passo do processo

### Listas Mistas

Você pode combinar os dois tipos:

1. Item ordenado principal
   - Subitem não ordenado
   - Outro subitem não ordenado
2. Segundo item ordenado
   - Mais subitens não ordenados

## Blocos de Código

### JavaScript / TypeScript

```javascript
// Exemplo de função assíncrona em JavaScript
async function fetchArticles() {
  try {
    const response = await fetch("/api/articles");
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Erro ao buscar artigos:", error);
    return [];
  }
}
```

```typescript
// Exemplo TypeScript com tipos
interface Article {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
}

const processArticle = (article: Article): string => {
  return `${article.title} - ${article.description}`;
};
```

### Python

```python
# Exemplo de classe em Python
class ArticleProcessor:
    def __init__(self, filename: str):
        self.filename = filename
        self.content = None

    def read_file(self) -> str:
        with open(self.filename, 'r', encoding='utf-8') as file:
            self.content = file.read()
        return self.content

    def extract_metadata(self) -> dict:
        # Extrai metadados do frontmatter
        lines = self.content.split('\n')
        metadata = {}

        if lines[0] == '---':
            for line in lines[1:]:
                if line == '---':
                    break
                key, value = line.split(':', 1)
                metadata[key.strip()] = value.strip()

        return metadata
```

### Bash / Shell

```bash
#!/bin/bash
# Script para deploy de aplicação

# Variáveis de ambiente
APP_NAME="meu-app"
ENVIRONMENT="production"

# Função de logging
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Build da aplicação
log "Iniciando build..."
npm run build

# Deploy
log "Fazendo deploy para $ENVIRONMENT..."
docker-compose up -d

log "Deploy concluído com sucesso!"
```

### SQL

```sql
-- Criar tabela de artigos
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para busca
CREATE INDEX idx_articles_slug ON articles(slug);

-- Query de exemplo
SELECT
    a.title,
    a.slug,
    COUNT(t.id) as tag_count
FROM articles a
LEFT JOIN article_tags t ON a.id = t.article_id
GROUP BY a.id, a.title, a.slug
ORDER BY a.created_at DESC
LIMIT 10;
```

### YAML

```yaml
# Configuração Docker Compose
version: "3.8"

services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    environment:
      - NGINX_HOST=example.com
      - NGINX_PORT=80
    depends_on:
      - api

  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
```

### JSON

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0"
  }
}
```

### HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Exemplo HTML</title>
    <style>
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Título Principal</h1>
      <p>Parágrafo de exemplo.</p>
    </div>
  </body>
</html>
```

### CSS

```css
/* Estilos customizados */
.article-content {
  max-width: 52rem;
  margin: 0 auto;
  padding: 2rem;
}

.article-content h2 {
  font-size: 1.875rem;
  color: var(--primary);
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}

.code-block {
  background: #0d1117;
  border-radius: 0.75rem;
  padding: 1.5rem;
  overflow-x: auto;
}
```

## Citações e Blocos

### Blockquotes

Use blockquotes para destacar citações, avisos ou informações importantes:

> **Importante:** Este é um exemplo de blockquote. Use para destacar informações críticas, citações ou chamadas de atenção especiais.

> **Dica:** Blockquotes recebem estilização especial com borda colorida e fundo sutil para destacar o conteúdo.

> **Observação:** Você pode usar formatação **Markdown** normal dentro de blockquotes, incluindo `código inline` e _ênfases_.

## Separadores Horizontais

Use separadores para dividir seções visualmente:

---

O separador acima foi criado com `---` (três hífens).

---

Também funciona com `***` (três asteriscos).

## Imagens

### Sintaxe Básica

```markdown
![Texto alternativo](URL_DA_IMAGEM)
```

### Exemplo de Imagem

![Logo Kubernetes](https://kubernetes.io/images/kubernetes-horizontal-color.png)

As imagens são automaticamente envolvidas em um wrapper com estilos responsivos, bordas arredondadas e sombras.

## Combinações Avançadas

### Lista com Código

1. **Instale as dependências:**

   ```bash
   npm install express cors dotenv
   ```

2. **Configure o servidor:**

   ```javascript
   const express = require("express");
   const app = express();

   app.use(express.json());
   app.listen(3000);
   ```

3. **Teste a aplicação:**
   ```bash
   curl http://localhost:3000/api/health
   ```

### Blockquote com Lista

> **Checklist de Segurança:**
>
> - Sempre valide inputs do usuário
> - Use HTTPS em produção
> - Implemente rate limiting
> - Sanitize dados antes de armazenar
> - Mantenha dependências atualizadas

## Boas Práticas de Escrita

### Estrutura Recomendada

1. **Introdução clara** - Explique o que será abordado
2. **Desenvolvimento progressivo** - Do simples ao complexo
3. **Exemplos práticos** - Código funcional e testado
4. **Conclusão útil** - Resumo e próximos passos

### Formatação de Código

- Use blocos de código para exemplos de 3+ linhas
- Especifique sempre a linguagem para syntax highlighting
- Adicione comentários explicativos no código
- Mantenha o código formatado e indentado

### Links e Referências

- Prefira links para documentação oficial
- Use texto descritivo ao invés de "clique aqui"
- Valide que os links estão funcionando

## Metadados do Artigo

### Frontmatter

O frontmatter no início do arquivo define metadados importantes:

```yaml
---
date: 2026-01-03
author: Guilherme Rossi Kirsten
tags: [Markdown, Tutorial, Template, Documentação]
---
```

**Campos disponíveis:**

- `date`: Data de publicação (formato YYYY-MM-DD)
- `author`: Nome do autor do artigo
- `tags`: Array de tags para categorização e busca

### Tags Recomendadas

Use tags específicas e relevantes:

- **Linguagens**: JavaScript, Python, TypeScript, Rust
- **Frameworks**: React, Next.js, Node.js, Django
- **Conceitos**: DevOps, Segurança, Performance, Testing
- **Ferramentas**: Docker, Kubernetes, Git, CI/CD

## Recursos Especiais do Sistema

### Auto-geração de Metadata

O sistema automaticamente:

- ✅ Extrai o título do primeiro `# Heading`
- ✅ Usa o primeiro parágrafo como descrição
- ✅ Gera slug a partir do nome do arquivo
- ✅ Processa tags do frontmatter para filtros

### Estilização Automática

Todo o Markdown é renderizado com:

- ✅ Tipografia otimizada para leitura (Prose)
- ✅ Syntax highlighting preparado para código
- ✅ Scrollbars customizados
- ✅ Design responsivo
- ✅ Modo escuro consistente
- ✅ Animações suaves

### Performance

- ✅ Parsing server-side (sem JavaScript no cliente)
- ✅ HTML estático gerado
- ✅ Imagens com lazy loading
- ✅ Code splitting automático

## Conclusão

Este template demonstra todos os recursos de Markdown disponíveis no sistema de artigos. Use-o como referência para criar conteúdo rico, bem formatado e profissional.

**Próximos Passos:**

1. Copie este template para criar um novo artigo
2. Substitua o conteúdo com seu material
3. Adicione tags relevantes no frontmatter
4. Salve o arquivo com um nome descritivo
5. Acesse `/articles` para ver seu artigo publicado

**Recursos Adicionais:**

- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [Documentação do Projeto](/articles)

---

**Happy Writing!** ✍️

function exemplo() {
const mensagem = "Olá, mundo!";
console.log(mensagem);
}

````

```python
# Python
def exemplo():
    mensagem = "Olá, mundo!"
    print(mensagem)
````

```typescript
// TypeScript
interface Usuario {
  nome: string;
  email: string;
}

function saudar(usuario: Usuario): void {
  console.log(`Olá, ${usuario.nome}!`);
}
```

```cpp
// C++
#include <iostream>

int main() {
    std::cout << "Olá, mundo!" << std::endl;
    return 0;
}
```

## Links e Referências

Você pode adicionar [links externos](https://exemplo.com) ou referências a recursos úteis.

**Recursos úteis:**

- [Documentação Oficial](https://exemplo.com/docs)
- [Tutorial Completo](https://exemplo.com/tutorial)
- [GitHub Repository](https://github.com/exemplo)

## Conclusão

Resuma os pontos principais do artigo e ofereça uma conclusão clara. Deixe o leitor com algo para pensar ou uma ação a tomar.

## Próximos Passos

- Sugestão de ação 1
- Sugestão de ação 2
- Sugestão de ação 3

---

**Nota:** Este é um template de exemplo. Customize conforme necessário para o seu conteúdo específico.
