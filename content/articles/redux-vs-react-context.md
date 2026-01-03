---
date: 2025-05-05
author: Guilherme Rossi Kirsten
tags: [React, Redux, Context API, State Management, Redux Toolkit]
---

# Redux vs React Context

Redux e React Context são duas abordagens diferentes para gerenciamento de estado em aplicações React, cada uma com suas características e casos de uso específicos.

## O que é Redux?

Redux é uma biblioteca de gerenciamento de estado previsível para aplicações JavaScript, comumente usada com React. Ele ajuda a manter o estado da aplicação centralizado e previsível.

## O que é React Context?

React Context é um mecanismo embutido no React que permite compartilhar estado entre componentes sem precisar passar props manualmente em cada nível da árvore de componentes.

## Comparação: Redux vs React Context

| Característica           | Redux                                                        | React Context                                                          |
| ------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **Complexidade**         | Maior, requer configuração da store, reducers e actions      | Menor, apenas criar e fornecer um contexto                             |
| **Escalabilidade**       | Ideal para estados globais e complexos                       | Melhor para estados locais e de menor escala                           |
| **Desempenho**           | Pode ser otimizado com `useSelector` e memoização            | Pode causar re-renderizações desnecessárias se mal utilizado           |
| **Ferramentas**          | Integração com Redux DevTools e middlewares como Redux Thunk | Nenhuma ferramenta específica, mas pode ser combinado com `useReducer` |
| **Curva de Aprendizado** | Maior, devido à estrutura e conceitos adicionais             | Menor, pois faz parte do próprio React                                 |

## Fluxo de Funcionamento no Redux

1. **Dispatch**: A aplicação dispara uma **ação** (um objeto com um `type` e, opcionalmente, um `payload`).
2. **Reducer**: O reducer recebe o estado atual e a ação, gerando um novo estado.
3. **Store**: O novo estado é atualizado na **store**, que notifica os componentes conectados.

## Fluxo de Funcionamento no React Context

1. Criar um contexto com `React.createContext()`.
2. Criar um **Provider** para armazenar e compartilhar o estado.
3. Consumir o contexto com `useContext()` nos componentes necessários.

## Estrutura Básica do Redux

### Criando a Store com `createStore`

```jsx
import { createStore } from "redux";

// Estado inicial
const initialState = { counter: 0 };

// Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

// Criando a store
const store = createStore(counterReducer);

export default store;
```

### Criando a Store com `configureStore`

```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
```

### Criando um Slice

```jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### Conectando o Redux ao React

```jsx
import { Provider } from "react-redux";
import store from "./store";
import Counter from "./Counter";

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
```

### Utilizando Redux no Componente com Hooks

```jsx
import { useSelector, useDispatch, useStore } from "react-redux";
import { increment, decrement } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const store = useStore();

  console.log("Estado atual:", store.getState());

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};

export default Counter;
```

## Estrutura Básica do React Context

### Criando um Contexto

```jsx
import { createContext, useState } from "react";

export const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};
```

### Consumindo o Contexto

```jsx
import { useContext } from "react";
import { CounterContext } from "./CounterContext";

const Counter = () => {
  const { count, setCount } = useContext(CounterContext);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
};

export default Counter;
```

## Quando Usar Redux?

Quando há necessidade de compartilhar estado entre múltiplos componentes.
Quando o estado precisa ser persistente e previsível.
Quando há alta complexidade na lógica de atualização do estado.

## Quando Usar React Context?

Quando o estado precisa ser compartilhado apenas entre poucos componentes.
Quando a aplicação é pequena e não precisa de gerenciamento avançado de estado.
Quando você quer evitar dependências externas.

## Conclusão

Redux e React Context têm propósitos diferentes. **Redux** é ideal para estados complexos e compartilhados globalmente, enquanto **React Context** é mais indicado para estados locais e menos complexos. A escolha entre um ou outro depende da escala e necessidades da aplicação.
