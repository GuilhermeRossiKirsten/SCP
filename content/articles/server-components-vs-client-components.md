---
date: 2025-05-20
author: Guilherme Rossi Kirsten
tags: [React, Server Components, Client Components, Performance, SSR]
---

# Server Components vs Client Components: Quando Usar Cada Um

React Server Components (RSC) e Client Components têm propósitos diferentes e devem ser usados estrategicamente para otimizar performance e interatividade.

## O que são React Server Components (RSC)?

React Server Components (RSC) são componentes que são renderizados no servidor e enviados ao cliente como HTML serializado, reduzindo o tamanho do bundle e melhorando a performance.

### Vantagens dos Server Components

- Menor bundle size → Código não precisa ser enviado ao cliente.
- Melhor performance inicial → Renderização ocorre no servidor.
- Acesso direto ao banco de dados e APIs sem expor credenciais.
- Reduz requisições desnecessárias → Pode processar dados antes do envio ao cliente.

### Limitações dos Server Components

- Sem estado local (`useState`) → São estáticos após o envio.
- Sem hooks como `useEffect` → Não podem executar efeitos no cliente.
- Sem interatividade direta → Dependem de Client Components para eventos de UI.

### Exemplos de uso para Server Components

```tsx
// Server Component
import db from "@/lib/db";

export default async function ProductList() {
  const products = await db.getProducts();
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

Aqui, o componente busca os produtos diretamente no banco de dados, sem precisar de uma requisição extra no cliente.

## O que são Client Components?

Client Components são renderizados e executados no navegador. Eles são necessários para interatividade e manipulação de estado.

### Vantagens dos Client Components

- Interatividade total → Eventos `onClick`, `onChange`, etc.
- Uso de hooks (`useState`, `useEffect`, `useContext`)
- Ideal para UI dinâmica → Modais, inputs, animações, etc.

### Limitações dos Client Components

- Maior bundle size → Todo o código precisa ser enviado ao cliente.
- Pode impactar performance → Especialmente se carregar dados no frontend.
- Requer mais gerenciamento de estado → Pode precisar de Redux/Zustand.

### Exemplos de uso para Client Components

```tsx
// Client Component
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Contar: {count}</button>;
}
```

Este componente precisa do `useState`, então deve ser renderizado no cliente.

## Quando Usar Server Components vs Client Components?

| Caso de Uso                                         | Server Component | Client Component |
| --------------------------------------------------- | ---------------- | ---------------- |
| Buscar dados do banco de dados                      | Sim              | Não              |
| Renderizar UI estática                              | Sim              | Não              |
| Manter estado (`useState`)                          | Não              | Sim              |
| Gerenciar efeitos (`useEffect`)                     | Não              | Sim              |
| Capturar eventos do usuário (`onClick`)             | Não              | Sim              |
| Componentes interativos (forms, sliders)            | Não              | Sim              |
| Renderizar tabelas grandes com dados pré-carregados | Sim              | Não              |
| Renderizar gráficos animados                        | Não              | Sim              |

## Estratégia Híbrida - Melhor dos Dois Mundos

Em uma aplicação real, usamos uma combinação de Server e Client Components:

1. Carregue dados no servidor (Server Component).
2. Habilite interatividade apenas onde necessário (Client Component).

### Exemplo híbrido

```tsx
// Server Component (busca os produtos e passa para o cliente)
import db from "@/lib/db";
import Product from "./Product";

export default async function ProductList() {
  const products = await db.getProducts();
  return (
    <ul>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
}
```

```tsx
// Client Component (adiciona interatividade ao produto)
"use client";

export default function Product({ product }) {
  return (
    <li>
      {product.name}{" "}
      <button onClick={() => alert(product.name)}>Ver detalhes</button>
    </li>
  );
}
```

Aqui, os dados vêm do servidor e a interatividade é tratada no cliente.

## Conclusão

- Use Server Components para renderizar dados e reduzir o bundle.
- Use Client Components para interatividade e estado.
- Combine os dois para otimizar performance e experiência do usuário.

Dica: Sempre pense na performance da aplicação ao escolher entre Server e Client Components!
