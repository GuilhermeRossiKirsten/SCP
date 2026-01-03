---
date: 2025-04-25
author: Guilherme Rossi Kirsten
tags:
  [
    React,
    Hooks,
    useState,
    useEffect,
    useReducer,
    useCallback,
    useMemo,
    useRef,
    useContext,
    Custom Hooks,
  ]
---

# React Hooks: Guia Completo

O React oferece diversos hooks que permitem gerenciar estado, efeitos colaterais, contexto e otimizações em componentes funcionais. Este guia aborda os principais hooks e suas aplicações práticas.

## useState

O `useState` é um hook que permite adicionar estado a componentes funcionais. Ele retorna um array com duas posições: o estado atual e uma função para atualizá-lo.

### Exemplo:

```jsx
import React, { useState } from "react";

function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}
```

- `count`: valor atual do estado.
- `setCount`: função para atualizar o estado.
- O estado é atualizado sempre que o botão é clicado.

## useRef

O `useRef` cria uma referência mutável que não dispara re-renderizações ao ser alterada. Ele é útil para armazenar referências a elementos do DOM ou valores que precisam persistir entre renderizações sem provocar re-renders.

### Exemplo:

```jsx
import React, { useRef } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Digite algo" />
      <button onClick={handleClick}>Focar no Input</button>
    </div>
  );
}
```

- `useRef` é usado para acessar diretamente o input sem precisar de um estado adicional.

## createPortal

O `createPortal` permite renderizar um componente fora da árvore principal do React, útil para criar modais e tooltips sem que eles sejam afetados por estilos do componente pai.

### Exemplo:

```jsx
import React from "react";
import ReactDOM from "react-dom";

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById("modal-root"),
  );
}
```

- Renderiza o modal dentro do elemento com `id="modal-root"`, fora da hierarquia do componente principal.

## createContext

O `createContext` permite compartilhar dados entre componentes sem a necessidade de prop drilling.

### Exemplo:

```jsx
import React, { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  return <p>O tema atual é {theme}</p>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}
```

- `createContext` fornece um valor para os componentes filhos.
- `useContext` acessa esse valor sem precisar passar via props.

## useCallback

O `useCallback` memoriza funções para evitar re-renderizações desnecessárias.

### Exemplo:

```jsx
import React, { useState, useCallback } from "react";

function Botao({ onClick }) {
  return <button onClick={onClick}>Clique</button>;
}

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Contador: {count}</p>
      <Botao onClick={handleClick} />
    </div>
  );
}
```

- Evita que a função `handleClick` seja recriada em cada renderização.

## useReducer

O `useReducer` gerencia estados mais complexos com lógica baseada em ações.

### Exemplo:

```jsx
import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```

- `useReducer` é útil para lógica de estado mais estruturada e previsível.

## useEffect

O `useEffect` lida com efeitos colaterais como chamadas de API e manipulação de DOM.

### Exemplo:

```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div>
      <p>Dados da API: {data ? JSON.stringify(data) : "Carregando..."}</p>
    </div>
  );
}
```

- `useEffect` executa a requisição na montagem do componente.
- O array de dependências `[]` faz com que o efeito rode apenas uma vez.

## useMemo

O `useMemo` é um hook que memoriza o valor de uma função computada, evitando cálculos desnecessários em renderizações repetidas.

### Quando usar?

- Quando há cálculos pesados que não devem ser reexecutados em cada render.
- Quando há listas filtradas ou ordenadas frequentemente.
- Quando uma função retorna um valor derivado de um estado ou prop.

### Exemplo:

```jsx
import React, { useState, useMemo } from "react";

function ExpensiveCalculation({ num }) {
  const computedValue = useMemo(() => {
    console.log("Executando cálculo pesado...");
    return num * 2;
  }, [num]);

  return <p>Resultado: {computedValue}</p>;
}

function App() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(5);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Incrementar Contador ({count})
      </button>
      <button onClick={() => setNum(num + 1)}>Alterar Número ({num})</button>
      <ExpensiveCalculation num={num} />
    </div>
  );
}
```

## memo

O `memo` é um HOC (Higher-Order Component) que memoriza um componente, impedindo sua re-renderização desnecessária caso suas props não tenham mudado.

### Quando usar?

- Quando um componente recebe props estáveis e não precisa ser re-renderizado.
- Quando há componentes filhos que são renderizados frequentemente sem necessidade.

### Exemplo:

```jsx
import React, { useState, memo } from "react";

const MemoizedComponent = memo(({ value }) => {
  console.log("Renderizando MemoizedComponent...");
  return <p>Valor: {value}</p>;
});

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("Teste");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Incrementar Contador ({count})
      </button>
      <button onClick={() => setValue(value + "!")}>
        Alterar Valor ({value})
      </button>
      <MemoizedComponent value={value} />
    </div>
  );
}
```

## Diferenças entre useMemo e memo

| Característica | `useMemo`                             | `memo`                                  |
| -------------- | ------------------------------------- | --------------------------------------- |
| Tipo           | Hook                                  | Higher-Order Component                  |
| Objetivo       | Memoriza valores computados           | Memoriza componentes                    |
| Evita          | Cálculos desnecessários               | Re-renderizações desnecessárias         |
| Uso comum      | Cálculos derivados de estado ou props | Componentes que recebem as mesmas props |

- Use **`useMemo`** quando precisar armazenar um valor computado sem recalcular em toda renderização.
- Use **`memo`** quando quiser evitar a re-renderização de um componente que recebe as mesmas props.
- Os dois podem ser combinados para otimizar o desempenho de aplicações React.

## Hooks Personalizados em React

Hooks personalizados são funções em React que utilizam hooks internos (como `useState`, `useEffect`, etc.) para encapsular e reutilizar lógicas complexas em diferentes componentes.

### Vantagens

- Reutilização de código
- Melhor organização
- Separação de responsabilidades
- Facilidade de manutenção

### Estrutura Básica

Um hook personalizado nada mais é do que uma função que segue a convenção de começar com "use". Exemplo:

```tsx
import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [width, setWidth];
}
```

### Como Usar

Esse hook pode ser utilizado em qualquer componente React:

```tsx
function MyComponent() {
  const [width, setWidth] = useWindowWidth();

  return (
    <div>
      <p>A largura da tela é: {width}px</p>
      <button onClick={() => setWidth(800)}>Definir largura para 800px</button>
    </div>
  );
}
```

### Exemplo Prático: Hook de Fetch

Um hook para buscar dados de uma API:

```tsx
import { useState, useEffect } from "react";

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, setData, loading, error };
}
```

Como usar:

```tsx
function Posts() {
  const { data, setData, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao buscar dados</p>;

  return (
    <div>
      <button onClick={() => setData([])}>Limpar dados</button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```
