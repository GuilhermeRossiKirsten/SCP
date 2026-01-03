---
date: 2025-05-12
author: Guilherme Rossi Kirsten
tags: [React, React Router, Rotas, Navegação, SPA]
---

# Rotas no React com react-router-dom

O `react-router-dom` é a biblioteca mais popular para gerenciamento de rotas em aplicações React, permitindo navegação entre páginas de forma declarativa e eficiente.

## Instalação

```sh
npm install react-router-dom
```

## Configuração com `createBrowserRouter`

A partir da versão 6.4 do `react-router-dom`, o `createBrowserRouter` permite estruturar as rotas de forma mais organizada.

### Exemplo de configuração:

```tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import UserProfile, { userLoader } from "./pages/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Define um layout principal
    errorElement: <ErrorPage />, // Tratamento de erro para essa rota
    children: [
      { index: true, element: <Home /> }, // Rota padrão
      { path: "about", element: <About /> },
      { path: "user/:id", element: <UserProfile />, loader: userLoader }, // Rota com loader
      { path: "*", element: <NotFound /> }, // Página 404
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

## O que é um `loader`?

O `loader` é uma função assíncrona que carrega dados antes de renderizar um componente de rota. Ele permite obter informações de APIs, bancos de dados ou qualquer outra fonte antes da renderização da página.

### Exemplo de um `loader` para buscar dados do usuário:

```tsx
export async function userLoader({ params }) {
  const response = await fetch(`https://api.example.com/users/${params.id}`);
  if (!response.ok) {
    throw new Response("Usuário não encontrado", { status: 404 });
  }
  return response.json();
}
```

Essa função recebe um objeto com `params`, que contém os parâmetros da URL, e retorna os dados do usuário.

### Como acessar os dados carregados no componente?

Utilizamos o hook `useLoaderData()` dentro do componente:

```tsx
import { useLoaderData } from "react-router-dom";

function UserProfile() {
  const user = useLoaderData(); // Obtém os dados carregados pelo loader

  return (
    <div>
      <h1>Perfil de {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserProfile;
```

## Tratamento de Erros com `errorElement`

O `errorElement` permite exibir uma página personalizada quando ocorre um erro na rota.

### Exemplo de uma página de erro:

```tsx
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops! Algo deu errado.</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}

export default ErrorPage;
```

Se o `loader` falhar (por exemplo, ao tentar buscar um usuário que não existe), o `errorElement` será exibido.

## Criando um Layout com `Outlet`

O `Outlet` permite renderizar rotas aninhadas dentro de um layout comum:

```tsx
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">Sobre</Link>
      </nav>
      <hr />
      <Outlet /> {/* Aqui serão carregadas as rotas filhas */}
    </div>
  );
}

export default Layout;
```

## Resumo Final

| **Funcionalidade**      | **Descrição**                              |
| ----------------------- | ------------------------------------------ |
| `createBrowserRouter()` | Cria a estrutura de rotas                  |
| `RouterProvider`        | Fornece as rotas para o app                |
| `Outlet`                | Renderiza rotas filhas                     |
| `errorElement`          | Define uma página personalizada para erros |
| `useRouteError()`       | Obtém detalhes do erro ocorrido na rota    |
| `loader`                | Carrega dados antes da renderização        |
| `useLoaderData()`       | Obtém os dados carregados pelo `loader`    |
| `useNavigate()`         | Navegação programática                     |
| `useParams()`           | Obtém parâmetros da URL                    |
| `Navigate`              | Redirecionamento                           |
| `Lazy Loading`          | Carregamento dinâmico                      |
