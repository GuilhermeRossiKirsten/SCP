---
date: 2025-04-20
author: Guilherme Rossi Kirsten
tags: [React, Componentes, Functional Components, Class Components]
---

# Componentes Baseados em Classe vs. Componentes Funcionais no React

O React permite a criação de componentes de duas formas principais: Componentes Baseados em Classe e Componentes Funcionais. Ambos têm o mesmo objetivo, mas possuem diferenças importantes.

## O que são Componentes Baseados em Classe?

Componentes de classe são definidos como classes ES6 e estendem `React.Component`. Eles utilizam o método `render()` para retornar JSX.

### Exemplo:

```jsx
import React, { Component } from "react";

class MeuComponente extends Component {
  constructor(props) {
    super(props);
    this.state = { contador: 0 };
  }

  incrementar = () => {
    this.setState({ contador: this.state.contador + 1 });
  };

  render() {
    return (
      <div>
        <p>Contador: {this.state.contador}</p>
        <button onClick={this.incrementar}>Incrementar</button>
      </div>
    );
  }
}

export default MeuComponente;
```

## O que são Componentes Funcionais?

Componentes funcionais são escritos como funções JavaScript que retornam JSX. Com a introdução dos **React Hooks** no React 16.8, eles passaram a suportar estado e efeitos colaterais.

### Exemplo:

```jsx
import React, { useState } from "react";

const MeuComponente = () => {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
};

export default MeuComponente;
```

## Diferenças Principais

| Característica | Componentes de Classe                                             | Componentes Funcionais |
| -------------- | ----------------------------------------------------------------- | ---------------------- |
| Definição      | Usa `class` e `extends`                                           | Usa `function` e Hooks |
| Estado         | `this.state` + `setState`                                         | `useState` Hook        |
| Ciclo de Vida  | `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` | `useEffect` Hook       |
| Performance    | Mais pesado                                                       | Mais leve e eficiente  |
| Legibilidade   | Código mais verboso                                               | Mais conciso e simples |
| Uso de Hooks   | Não suportado                                                     | Suportado              |

## Vantagens e Desvantagens

### Componentes de Classe

**Vantagens:**

- Familiaridade para projetos legados.
- Métodos de ciclo de vida são bem estruturados.

**Desvantagens:**

- Código mais verboso e difícil de manter.
- Performance inferior devido à necessidade de `this` e re-renderização mais custosa.
- Maior complexidade para reutilização de lógica entre componentes.

### Componentes Funcionais

**Vantagens:**

- Código mais enxuto e legível.
- Hooks permitem reuso de lógica sem a necessidade de hierarquias complexas.
- Melhor performance e otimização nativa do React.

**Desvantagens:**

- Requer aprendizado de Hooks para quem vem de componentes de classe.
- Pode ser mais difícil de entender para códigos antigos sem Hooks.

## Qual Utilizar?

A partir do React 16.8, o uso de **Componentes Funcionais com Hooks** é a abordagem recomendada pelo React. Componentes de classe ainda funcionam e podem ser encontrados em códigos legados, mas para novos projetos, a abordagem funcional é preferida por ser mais simples e eficiente.

**Conclusão:** Prefira **Componentes Funcionais** com Hooks, a menos que esteja mantendo um projeto legado que já utiliza **Componentes de Classe** extensivamente.
