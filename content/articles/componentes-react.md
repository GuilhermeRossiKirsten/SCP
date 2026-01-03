---
date: 2025-08-22
author: Guilherme Rossi Kirsten
tags: [React, Componentes, Props, Estados, Eventos, CSS, Listas, Renderização]
---

# Componentes no React

Componentes são blocos reutilizáveis de UI em React que formam a base de qualquer aplicação.

## O que são Componentes?

- Componentes são blocos reutilizáveis de UI em React.
- Podem ser escritos como **funções** ou **classes**.

```jsx
function MeuComponente() {
  return <h1>Olá, Mundo!</h1>;
}
```

### JSX & React Components

- JSX é uma extensão de JavaScript que permite escrever HTML dentro do código React.
- Exemplo:

```jsx
const elemento = <h1>Olá, JSX!</h1>;
```

### Criando e Usando um Componente

- Um componente pode ser usado dentro de outro:

```jsx
function App() {
  return (
    <div>
      <MeuComponente />
    </div>
  );
}
```

## Construção de Componentes

### Estrutura de Arquivos e Organização

- Manter componentes em arquivos separados para modularidade.
- Exemplo de organização:
  - `components/MeuComponente.js`
  - `components/Botao.js`

### Props (Propriedades)

- Permitem passar dados para componentes.

```jsx
function Saudacao(props) {
  return <h1>Olá, {props.nome}!</h1>;
}

<Saudacao nome="Carlos" />;
```

### Trabalhando com Propriedades Dinâmicas

- Propriedades podem ser valores dinâmicos, como variáveis ou estados.

```jsx
const nome = "Maria";
<Saudacao nome={nome} />;
```

## Estado e Eventos

### Gerenciamento de Estado com `useState`

- `useState` permite que um componente tenha estado interno.

```jsx
import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Contagem: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}
```

### Manipulação de Eventos

- Eventos em React funcionam de forma similar ao JavaScript.

```jsx
function Botao() {
  function handleClick() {
    alert("Botão clicado!");
  }
  return <button onClick={handleClick}>Clique aqui</button>;
}
```

## Renderização e Condições

### Renderização Condicional

- Exemplo com operador ternário:

```jsx
function Mensagem({ logado }) {
  return logado ? <h1>Bem-vindo!</h1> : <h1>Por favor, faça login.</h1>;
}
```

### Listas e Renderização Dinâmica

- Renderizando uma lista de elementos:

```jsx
const frutas = ["Maçã", "Banana", "Laranja"];

function ListaFrutas() {
  return (
    <ul>
      {frutas.map((fruta, index) => (
        <li key={index}>{fruta}</li>
      ))}
    </ul>
  );
}
```

## Estilização no React

### CSS no React

- Estilização inline:

```jsx
const estilo = { color: "blue", fontSize: "20px" };
<p style={estilo}>Texto azul</p>;
```

- Utilização de arquivos CSS:

```css
.texto-vermelho {
  color: red;
}
```

```jsx
<p className="texto-vermelho">Texto vermelho</p>
```
