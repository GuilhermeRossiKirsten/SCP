---
date: 2026-01-02
author: Guilherme Rossi Kirsten
tags: [C++, Programação, Performance, C++17, C++20]
---

# Introdução ao C++ Moderno

O C++ moderno trouxe mudanças significativas na forma como desenvolvemos software de alto desempenho. Neste artigo, exploramos as principais features do C++17 e C++20 que todo desenvolvedor deve conhecer.

## O Que Mudou no C++ Moderno?

O C++ evoluiu significativamente desde suas versões anteriores. Com a introdução do C++11, C++14, C++17 e C++20, a linguagem ganhou recursos que a tornam mais segura, expressiva e poderosa.

### Smart Pointers

Uma das mudanças mais importantes foi a introdução dos smart pointers. Eles ajudam a gerenciar a memória de forma automática, reduzindo significativamente os problemas de memory leaks.

```cpp
#include <memory>

// unique_ptr - ownership exclusivo
std::unique_ptr<int> ptr1 = std::make_unique<int>(42);

// shared_ptr - ownership compartilhado
std::shared_ptr<int> ptr2 = std::make_shared<int>(100);
```

### Auto Type Deduction

O uso de `auto` permite que o compilador infira automaticamente o tipo de uma variável, tornando o código mais limpo e menos propenso a erros.

```cpp
auto x = 42;              // int
auto y = 3.14;            // double
auto name = "C++";        // const char*
auto vec = std::vector<int>{1, 2, 3};
```

## Range-based For Loops

Os loops baseados em range tornam a iteração sobre containers muito mais simples e legível:

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

for (const auto& num : numbers) {
    std::cout << num << " ";
}
```

## Lambda Functions

Lambdas permitem criar funções anônimas inline, muito úteis com algoritmos da STL:

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};

auto sum = std::accumulate(vec.begin(), vec.end(), 0,
    [](int a, int b) { return a + b; });
```

## Structured Bindings (C++17)

Desempacote múltiplos valores de forma elegante:

```cpp
std::map<std::string, int> ages = {{"Alice", 30}, {"Bob", 25}};

for (const auto& [name, age] : ages) {
    std::cout << name << " is " << age << " years old\n";
}
```

## Concepts (C++20)

Concepts permitem especificar requisitos para templates de forma clara:

```cpp
template<typename T>
concept Numeric = std::is_arithmetic_v<T>;

template<Numeric T>
T add(T a, T b) {
    return a + b;
}
```

## Conclusão

O C++ moderno oferece ferramentas poderosas que tornam o desenvolvimento mais seguro e produtivo. Adotar essas práticas não só melhora a qualidade do código, mas também facilita a manutenção a longo prazo.

**Recursos Adicionais:**

- [cppreference.com](https://cppreference.com) - Referência completa do C++
- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/) - Melhores práticas
- Effective Modern C++ por Scott Meyers

Continue aprendendo e experimentando com essas features. O C++ continua evoluindo, e dominar essas técnicas é essencial para qualquer desenvolvedor sério da linguagem.
