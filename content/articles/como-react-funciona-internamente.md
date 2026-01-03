---
date: 2025-04-16
author: Guilherme Rossi Kirsten
tags: [React, Virtual DOM, JSX, Fibers, Performance, Reconciliação]
---

# Como o React Funciona Internamente

React é uma biblioteca para construção de interfaces declarativas e eficientes, utilizando um modelo baseado em componentes. Para otimizar a performance, ele emprega um conceito chamado **Virtual DOM** e um mecanismo inteligente de reconciliação.

## Processo de Renderização

A renderização no React pode ser dividida em duas etapas:

### Render Phase (Fase de Renderização)

Nesta fase, o React chama os componentes para gerar a estrutura de elementos do Virtual DOM.

1. **Componentes são chamados** e retornam JSX.
2. **JSX é convertido para uma representação em JavaScript** (React.createElement).
3. **Um novo Virtual DOM é criado** com essa representação.

### Commit Phase (Fase de Commit)

O React compara o novo Virtual DOM com o antigo (**reconciliation**) e aplica as diferenças no DOM real (**DOM diffing**).

1. **Calcula as diferenças** entre o novo e o antigo Virtual DOM.
2. **Gera um "patch" (conjunto de modificações)** com as mudanças necessárias.
3. **Atualiza o DOM real** de forma eficiente.

## Virtual DOM e Reconciliação

O **Virtual DOM** é uma representação do DOM na memória que permite ao React minimizar alterações reais no DOM, melhorando a performance.

- O React **compara o Virtual DOM antigo com o novo**.
- Usa um algoritmo eficiente chamado **Diffing Algorithm**.
- Apenas as diferenças detectadas são aplicadas ao **DOM real**.

## Como o JSX é Compilado

O JSX não é entendido pelo navegador. Ele é convertido para chamadas de `React.createElement`, que retornam um objeto JavaScript representando o componente.

### Exemplo:

#### JSX Original

```jsx
const elemento = <h1>Olá, React!</h1>;
```

#### Convertido pelo Babel

```js
const elemento = React.createElement("h1", null, "Olá, React!");
```

Esse objeto é processado pelo React para criar e atualizar elementos do DOM.

## Fibers: O Motor do React

A partir do React 16, o **Fiber Reconciler** substituiu o algoritmo de reconciliação antigo. Ele permite:

- **Interrupções na renderização** (para manter a interface responsiva).
- **Priorizacão de tarefas** (como animações e interações do usuário).
- **Renderização assíncrona**, melhorando a performance em aplicações complexas.

## React e o DOM Virtual na Prática

### Fluxo de Atualização:

1. **Estado ou props mudam.**
2. **Renderização do componente é disparada.**
3. **Novo Virtual DOM é gerado.**
4. **Diffing Algorithm compara o novo e o antigo Virtual DOM.**
5. **DOM real é atualizado apenas onde houve mudanças.**

## Conclusão

O React otimiza a manipulação do DOM utilizando um sistema eficiente baseado no Virtual DOM e no algoritmo de reconciliação. Com o React Fiber, a biblioteca tornou-se ainda mais eficiente, permitindo renderização assíncrona e priorização de tarefas. Isso faz do React uma excelente escolha para aplicações web modernas e de alto desempenho.
