---
date: 2025-10-05
author: Guilherme Rossi Kirsten
tags: [C++, Estruturas, Strings, Tipos de Dados, Programação, Certificação]
---

# Bloco 4 – Estruturas e Strings

Este bloco aborda estruturas (structs) e manipulação de strings em C++.

## Resumo do Conteúdo

Estruturas permitem agrupar dados relacionados em um único tipo composto. Strings são essenciais para processar texto. Este bloco ensina como criar e manipular estruturas complexas, trabalhar com vetores de estruturas e dominar operações com strings da STL. Compreender esses conceitos é fundamental para organizar dados e processar informações textuais de forma eficiente.

## Declarar e definir estruturas

### Declaração Básica de Estrutura

```cpp
// Declaração de estrutura
struct Pessoa {
    string nome;
    int idade;
    double altura;
};
```

**Explicação**:

- `struct` define um tipo de dados composto
- Agrupa múltiplos dados relacionados (membros)
- Cada membro pode ter tipo diferente
- Termina com `;` após a chave

### Definição e Inicialização de Estrutura

```cpp
// Definir estrutura
struct Ponto {
    int x;
    int y;
};

// Criar instância
Ponto p1;
p1.x = 10;
p1.y = 20;

// Criar com inicialização direta
Ponto p2 = {5, 15};

// C++11 uniform initialization
Ponto p3{30, 40};

// Inicialização com valores padrão (C++11)
Ponto p4 = {};  // x=0, y=0
```

**Formas de inicialização**:

```cpp
struct Retangulo {
    double largura;
    double altura;
};

// 1. Atribuição membro a membro
Retangulo r1;
r1.largura = 10.0;
r1.altura = 5.0;

// 2. Lista de inicialização
Retangulo r2 = {10.0, 5.0};

// 3. Uniform initialization (C++11)
Retangulo r3{10.0, 5.0};

// 4. Designated initializers (C++20)
Retangulo r4 = {.largura = 10.0, .altura = 5.0};
```

### Estruturas Aninhadas

```cpp
struct Endereco {
    string rua;
    string cidade;
    int cep;
};

struct Funcionario {
    string nome;
    int id;
    Endereco endereco;  // Estrutura dentro de estrutura
};

// Uso
Funcionario func;
func.nome = "João Silva";
func.id = 12345;
func.endereco.rua = "Rua das Flores, 123";
func.endereco.cidade = "São Paulo";
func.endereco.cep = 12345678;

// Ou com inicialização
Funcionario func2 = {
    "Maria Santos",
    67890,
    {"Av. Paulista, 1000", "São Paulo", 01310100}
};
```

**Explicação**: Estruturas podem conter outras estruturas, permitindo modelar dados hierárquicos complexos.

### Estrutura com Funções-Membro

```cpp
struct Retangulo {
    double largura;
    double altura;

    // Função-membro (método)
    double area() {
        return largura * altura;
    }

    double perimetro() {
        return 2 * (largura + altura);
    }

    // Função para verificar se é quadrado
    bool ehQuadrado() {
        return largura == altura;
    }
};

// Uso
Retangulo ret;
ret.largura = 5.0;
ret.altura = 3.0;

cout << "Área: " << ret.area() << endl;         // 15.0
cout << "Perímetro: " << ret.perimetro() << endl;  // 16.0
cout << "É quadrado? " << (ret.ehQuadrado() ? "Sim" : "Não") << endl;
```

**Estrutura vs Classe**:

- Em C++, `struct` e `class` são quase idênticos
- Diferença: `struct` tem membros públicos por padrão, `class` privados
- Use `struct` para simples agrupamento de dados
- Use `class` para objetos com comportamento complexo

### Construtor em Estrutura (C++11)

```cpp
struct Ponto {
    int x, y;

    // Construtor
    Ponto(int x_val, int y_val) : x(x_val), y(y_val) {}

    // Construtor padrão
    Ponto() : x(0), y(0) {}
};

// Uso
Ponto p1(10, 20);  // Usa construtor parametrizado
Ponto p2;          // Usa construtor padrão (0, 0)
```

## Acessar membros da estrutura usando o operador ponto (.)

### Acesso Básico a Membros

```cpp
struct Aluno {
    string nome;
    int matricula;
    double media;
};

int main() {
    Aluno aluno;

    // Atribuir valores usando operador ponto
    aluno.nome = "Carlos Silva";
    aluno.matricula = 202301;
    aluno.media = 8.5;

    // Acessar valores usando operador ponto
    cout << "Nome: " << aluno.nome << endl;
    cout << "Matrícula: " << aluno.matricula << endl;
    cout << "Média: " << aluno.media << endl;

    return 0;
}
```

**Explicação**: O operador `.` (ponto) acessa membros de uma estrutura através de uma instância da estrutura.

### Ponteiro para Estrutura

```cpp
struct Livro {
    string titulo;
    string autor;
    int paginas;
};

int main() {
    Livro livro;
    Livro* ptr = &livro;

    // Acesso usando operador ponto (objeto)
    livro.titulo = "C++ Programming";

    // Acesso usando operador seta (ponteiro)
    ptr->autor = "Bjarne Stroustrup";
    ptr->paginas = 1000;

    // Alternativa: desreferenciar depois usar ponto
    (*ptr).titulo = "The C++ Programming Language";

    cout << livro.titulo << endl;
    cout << livro.autor << endl;
    cout << livro.paginas << endl;

    return 0;
}
```

**Operadores de acesso**:

- `.` (ponto): Para objetos
- `->` (seta): Para ponteiros (equivalente a `(*ptr).membro`)

### Modificar Membros da Estrutura

```cpp
struct Carro {
    string marca;
    string modelo;
    int ano;
    double preco;
};

void atualizarPreco(Carro& carro, double novoPreco) {
    carro.preco = novoPreco;
}

void aplicarDesconto(Carro& carro, double percentual) {
    carro.preco *= (1.0 - percentual / 100.0);
}

int main() {
    Carro meuCarro;
    meuCarro.marca = "Toyota";
    meuCarro.modelo = "Corolla";
    meuCarro.ano = 2023;
    meuCarro.preco = 95000.0;

    // Atualizar preço
    atualizarPreco(meuCarro, 98000.0);

    // Aplicar desconto de 10%
    aplicarDesconto(meuCarro, 10);

    cout << "Preço final: R$ " << fixed << setprecision(2)
         << meuCarro.preco << endl;  // R$ 88200.00

    return 0;
}
```

### Comparar Estruturas

```cpp
struct Data {
    int dia, mes, ano;

    // Função para comparar datas
    bool ehAntesDe(const Data& outra) const {
        if (ano != outra.ano) return ano < outra.ano;
        if (mes != outra.mes) return mes < outra.mes;
        return dia < outra.dia;
    }

    bool ehIgual(const Data& outra) const {
        return dia == outra.dia && mes == outra.mes && ano == outra.ano;
    }
};

int main() {
    Data d1 = {15, 3, 2024};
    Data d2 = {20, 3, 2024};

    if (d1.ehAntesDe(d2)) {
        cout << "d1 é anterior a d2" << endl;
    }

    return 0;
}
```

**Nota**: C++ não compara estruturas automaticamente com `==`. Você precisa implementar a comparação.

## Declarar vetores de estruturas e acessar seus campos

### Vector de Estruturas

```cpp
#include <vector>
using namespace std;

struct Produto {
    string nome;
    double preco;
    int quantidade;
};

int main() {
    // Declarar vector de estruturas
    vector<Produto> estoque;

    // Adicionar produtos
    Produto p1 = {"Notebook", 2500.00, 5};
    Produto p2 = {"Mouse", 35.00, 20};
    Produto p3 = {"Teclado", 150.00, 15};

    estoque.push_back(p1);
    estoque.push_back(p2);
    estoque.push_back(p3);

    // Acessar campos
    for (int i = 0; i < estoque.size(); i++) {
        cout << "Produto: " << estoque[i].nome << endl;
        cout << "Preço: R$ " << fixed << setprecision(2)
             << estoque[i].preco << endl;
        cout << "Quantidade: " << estoque[i].quantidade << endl;
        cout << "---" << endl;
    }

    return 0;
}
```

**Explicação**: Vector de estruturas funciona como vector de qualquer tipo, mas cada elemento é uma estrutura com múltiplos campos.

### Inicializar Vector de Estruturas

```cpp
struct Coordenada {
    int x;
    int y;
};

int main() {
    // Inicializar com lista (C++11)
    vector<Coordenada> pontos = {
        {0, 0},
        {10, 20},
        {30, 40},
        {50, 60}
    };

    // Acessar usando range-based for
    for (const Coordenada& p : pontos) {
        cout << "(" << p.x << ", " << p.y << ")" << endl;
    }

    // Adicionar novos pontos
    pontos.push_back({70, 80});
    pontos.push_back({90, 100});

    return 0;
}
```

### Modificar Elementos do Vector

```cpp
struct Estudante {
    string nome;
    double nota;
};

int main() {
    vector<Estudante> turma = {
        {"Alice", 8.5},
        {"Bob", 7.0},
        {"Carlos", 6.5}
    };

    // Modificar nota específica
    turma[1].nota = 8.5;

    // Adicionar novo estudante
    Estudante novo = {"Diana", 9.0};
    turma.push_back(novo);

    // Modificar através de referência
    for (Estudante& e : turma) {
        e.nota += 0.5;  // Bônus de 0.5 para todos
    }

    // Exibir todos
    for (const Estudante& e : turma) {
        cout << e.nome << ": " << e.nota << endl;
    }

    return 0;
}
```

### Ordenar Vector de Estruturas

```cpp
#include <algorithm>
#include <vector>
using namespace std;

struct Funcionario {
    string nome;
    double salario;
};

// Função de comparação
bool compararPorSalario(const Funcionario& a, const Funcionario& b) {
    return a.salario > b.salario;  // Ordem decrescente
}

int main() {
    vector<Funcionario> funcionarios = {
        {"Alice", 5000.00},
        {"Bob", 7000.00},
        {"Carlos", 4500.00},
        {"Diana", 6000.00}
    };

    // Ordenar por salário (decrescente)
    sort(funcionarios.begin(), funcionarios.end(), compararPorSalario);

    // Exibir lista ordenada
    cout << "Funcionários por salário:" << endl;
    for (const Funcionario& f : funcionarios) {
        cout << f.nome << ": R$ " << fixed << setprecision(2)
             << f.salario << endl;
    }

    return 0;
}
```

**Usando lambda (C++11)**:

```cpp
// Ordenar por nome (ordem alfabética)
sort(funcionarios.begin(), funcionarios.end(),
     [](const Funcionario& a, const Funcionario& b) {
         return a.nome < b.nome;
     });
```

### Buscar em Vector de Estruturas

```cpp
struct Item {
    int id;
    string descricao;
};

int main() {
    vector<Item> items = {
        {101, "Produto A"},
        {202, "Produto B"},
        {303, "Produto C"}
    };

    int idBusca = 202;
    bool encontrado = false;

    // Busca linear
    for (const Item& item : items) {
        if (item.id == idBusca) {
            cout << "Encontrado: " << item.descricao << endl;
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        cout << "Item não encontrado" << endl;
    }

    return 0;
}
```

### Estatísticas com Vector de Estruturas

```cpp
struct Venda {
    string produto;
    double valor;
    int quantidade;
};

int main() {
    vector<Venda> vendas = {
        {"Notebook", 2500.00, 2},
        {"Mouse", 35.00, 10},
        {"Teclado", 150.00, 5}
    };

    // Calcular total de vendas
    double total = 0.0;
    int totalItens = 0;

    for (const Venda& v : vendas) {
        double subtotal = v.valor * v.quantidade;
        total += subtotal;
        totalItens += v.quantidade;

        cout << v.produto << ": R$ " << subtotal << endl;
    }

    cout << "\nTotal: R$ " << fixed << setprecision(2) << total << endl;
    cout << "Total de itens: " << totalItens << endl;
    cout << "Média por item: R$ " << (total / totalItens) << endl;

    return 0;
}
```

## Declarar, inicializar e manipular objetos std::string

### Declaração e Inicialização de Strings

```cpp
#include <string>
using namespace std;

// String vazia
string str1;

// Inicializar com literal
string str2 = "Olá";

// Inicializar com outra string
string str3 = str2;

// Inicializar com caractere repetido
string str4(5, 'A');  // "AAAAA"

// Uniform initialization (C++11)
string str5{"Mundo"};

// Parte de outra string
string str6 = "Hello World";
string str7(str6, 6, 5);  // "World" (a partir da posição 6, 5 caracteres)
```

**Explicação**: `std::string` é uma classe da biblioteca padrão que gerencia automaticamente a memória para strings.

### Entrada e Saída de Strings

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string nome;

    // Ler palavra (até espaço ou Enter)
    cout << "Digite seu nome: ";
    cin >> nome;

    // Ler linha completa (com espaços)
    string nomeCompleto;
    cout << "Digite nome completo: ";
    cin.ignore();  // Limpar buffer
    getline(cin, nomeCompleto);

    // Saída
    cout << "Nome: " << nome << endl;
    cout << "Nome completo: " << nomeCompleto << endl;

    return 0;
}
```

**Diferença**:

- `cin >>` lê até espaço/tab/Enter
- `getline()` lê linha completa incluindo espaços

### Concatenação de Strings

```cpp
string primeiro = "Olá";
string segundo = "Mundo";

// Usando operador +
string resultado1 = primeiro + " " + segundo;  // "Olá Mundo"

// Usando operador +=
string resultado2 = primeiro;
resultado2 += " ";
resultado2 += segundo;  // "Olá Mundo"

// Usando método append()
string resultado3 = primeiro;
resultado3.append(" ");
resultado3.append(segundo);  // "Olá Mundo"

// Concatenar com literal
string saudacao = "Olá, " + string("mundo") + "!";

cout << resultado1 << endl;
```

**Cuidado**: Não pode concatenar dois literais diretamente:

```cpp
// string str = "Hello" + " World";  // ERRO!
string str = string("Hello") + " World";  // OK
string str2 = "Hello" + string(" World");  // OK
```

### Tamanho e Acesso

```cpp
string texto = "C++ Programming";

// Obter tamanho
int tamanho1 = texto.length();  // 15
int tamanho2 = texto.size();    // 15 (mesmo que length)

// Verificar se vazia
bool vazia = texto.empty();  // false

// Acessar caracteres
char primeiro = texto[0];        // 'C' (sem verificação)
char segundo = texto.at(1);      // '+' (com verificação de limites)

// Modificar caractere
texto[0] = 'c';  // "c++ Programming"

// Último caractere
char ultimo = texto[texto.length() - 1];  // 'g'
char ultimo2 = texto.back();               // 'g' (C++11)

// Primeiro caractere
char primeiro2 = texto.front();  // 'c' (C++11)
```

**Iterar através da string**:

```cpp
string texto = "Hello";

// Índice tradicional
for (int i = 0; i < texto.length(); i++) {
    cout << texto[i] << " ";
}
cout << endl;

// Range-based for
for (char c : texto) {
    cout << c << " ";
}
cout << endl;

// Modificar com referência
for (char& c : texto) {
    c = toupper(c);  // Converte para maiúscula
}
cout << texto << endl;  // "HELLO"
```

### Métodos de Manipulação de String

```cpp
string texto = "Hello World";

// Substring
string sub1 = texto.substr(0, 5);   // "Hello" (posição 0, 5 caracteres)
string sub2 = texto.substr(6);      // "World" (do 6 até o final)

// Buscar
size_t pos1 = texto.find("World");   // 6 (posição onde começa)
size_t pos2 = texto.find("xyz");     // string::npos (não encontrado)

// Buscar do final
size_t pos3 = texto.rfind("o");      // 7 (último 'o')

// Buscar qualquer caractere de um conjunto
size_t pos4 = texto.find_first_of("aeiou");  // 1 ('e')
size_t pos5 = texto.find_last_of("aeiou");   // 7 ('o')

// Substituir
texto.replace(0, 5, "Hi");   // "Hi World" (substitui "Hello")

// Inserir
texto.insert(2, " there");   // "Hi there World"

// Apagar
texto.erase(0, 3);           // "there World" (remove 3 caracteres)

// Limpar completamente
texto.clear();               // ""

// Verificar se vazia
bool vazia = texto.empty();  // true
```

### Conversões de Tipo

```cpp
#include <string>
using namespace std;

// String para número
string numStr = "123";
int num = stoi(numStr);           // 123 (string to int)
long lng = stol("1000000");       // 1000000 (string to long)
float flt = stof("3.14");         // 3.14 (string to float)
double dbl = stod("3.14159");     // 3.14159 (string to double)

// Número para string
int valor = 42;
string str1 = to_string(valor);   // "42"

double pi = 3.14159;
string str2 = to_string(pi);      // "3.141590"

// String C-style
string cplusplus = "Hello";
const char* cstring = cplusplus.c_str();  // Ponteiro para array C
```

## Realizar operações básicas e comparações com strings

### Comparação de Strings

```cpp
string str1 = "maçã";
string str2 = "banana";
string str3 = "maçã";

// Usando operadores de comparação
bool igual = (str1 == str3);         // true
bool diferente = (str1 != str2);     // true
bool menor = (str1 < str2);          // false (ordem alfabética)
bool maior = (str2 > str1);          // true
bool menorIgual = (str1 <= str3);    // true
bool maiorIgual = (str2 >= str1);    // true

// Usando método compare()
int result1 = str1.compare(str2);    // negativo (str1 < str2)
int result2 = str1.compare(str3);    // 0 (iguais)
int result3 = str2.compare(str1);    // positivo (str2 > str1)

// Comparação case-insensitive (necessita loop manual)
bool igualIgnoraCase(const string& a, const string& b) {
    if (a.length() != b.length()) return false;
    for (size_t i = 0; i < a.length(); i++) {
        if (tolower(a[i]) != tolower(b[i])) return false;
    }
    return true;
}
```

**Explicação da comparação lexicográfica**:

```cpp
"apple" < "banana"   // true (ordem alfabética)
"10" < "2"           // true (comparação de strings, não números!)
"A" < "a"            // true (maiúsculas vêm antes na tabela ASCII)
```

### Conversão de Caso (Maiúsculas/Minúsculas)

```cpp
#include <algorithm>
#include <cctype>
using namespace std;

string texto = "Hello World";

// Converter para maiúsculas
transform(texto.begin(), texto.end(), texto.begin(), ::toupper);
cout << texto << endl;  // "HELLO WORLD"

// Converter para minúsculas
transform(texto.begin(), texto.end(), texto.begin(), ::tolower);
cout << texto << endl;  // "hello world"

// Capitalizar primeira letra
string palavra = "hello";
palavra[0] = toupper(palavra[0]);
cout << palavra << endl;  // "Hello"

// Capitalizar cada palavra
string frase = "hello world from cpp";
bool novapalavra = true;
for (char& c : frase) {
    if (isspace(c)) {
        novapalavra = true;
    } else if (novapalavra) {
        c = toupper(c);
        novapalavra = false;
    }
}
cout << frase << endl;  // "Hello World From Cpp"
```

### Busca em Strings

```cpp
string texto = "The quick brown fox jumps over the lazy dog";

// Encontrar primeira ocorrência
size_t pos1 = texto.find("fox");      // 16
if (pos1 != string::npos) {
    cout << "Encontrado na posição " << pos1 << endl;
}

// Encontrar a partir de uma posição
size_t pos2 = texto.find("the", 10);  // 31 (segunda ocorrência)

// Encontrar última ocorrência
size_t pos3 = texto.rfind("o");       // 41 (último 'o')

// Encontrar primeiro de um conjunto
size_t pos4 = texto.find_first_of("aeiou");  // 2 ('e')

// Encontrar primeiro que NÃO seja do conjunto
size_t pos5 = texto.find_first_not_of("The ");  // 4 ('q')

// Contar ocorrências
string busca = "o";
int contador = 0;
size_t pos = texto.find(busca);
while (pos != string::npos) {
    contador++;
    pos = texto.find(busca, pos + 1);
}
cout << "Ocorrências de 'o': " << contador << endl;  // 4
```

### Modificação de Strings

```cpp
string texto = "  Hello World  ";

// Remover espaços iniciais e finais (trim)
texto.erase(0, texto.find_first_not_of(" "));  // Remove início
texto.erase(texto.find_last_not_of(" ") + 1);  // Remove final
cout << "|" << texto << "|" << endl;  // "|Hello World|"

// Reverter string
string original = "Hello";
reverse(original.begin(), original.end());
cout << original << endl;  // "olleH"

// Substituir todas as ocorrências
string frase = "Eu gosto de gatos. Gatos são fofos.";
string de = "gatos";
string para = "cães";
size_t pos = 0;
while ((pos = frase.find(de, pos)) != string::npos) {
    frase.replace(pos, de.length(), para);
    pos += para.length();
}
cout << frase << endl;  // "Eu gosto de cães. Gatos são fofos."
// (Note que é case-sensitive, "Gatos" com G maiúsculo não foi alterado)
```

### Dividir String (Split)

```cpp
#include <sstream>
#include <vector>

// Dividir string por delimitador
vector<string> split(const string& texto, char delimitador) {
    vector<string> resultado;
    stringstream ss(texto);
    string item;

    while (getline(ss, item, delimitador)) {
        resultado.push_back(item);
    }

    return resultado;
}

int main() {
    string csv = "João,25,Engenheiro";
    vector<string> partes = split(csv, ',');

    for (const string& parte : partes) {
        cout << parte << endl;
    }
    // João
    // 25
    // Engenheiro

    return 0;
}
```

### Juntar Strings (Join)

```cpp
#include <vector>
#include <string>

string join(const vector<string>& partes, const string& separador) {
    string resultado;
    for (size_t i = 0; i < partes.size(); i++) {
        resultado += partes[i];
        if (i < partes.size() - 1) {
            resultado += separador;
        }
    }
    return resultado;
}

int main() {
    vector<string> palavras = {"C++", "é", "poderoso"};
    string frase = join(palavras, " ");
    cout << frase << endl;  // "C++ é poderoso"

    return 0;
}
```

### Validação de Strings

```cpp
#include <cctype>

// Verificar se é número
bool ehNumero(const string& str) {
    for (char c : str) {
        if (!isdigit(c)) return false;
    }
    return !str.empty();
}

// Verificar se é letra
bool ehAlfabetico(const string& str) {
    for (char c : str) {
        if (!isalpha(c)) return false;
    }
    return !str.empty();
}

// Verificar se é alfanumérico
bool ehAlfanumerico(const string& str) {
    for (char c : str) {
        if (!isalnum(c)) return false;
    }
    return !str.empty();
}

int main() {
    cout << ehNumero("12345") << endl;      // 1 (true)
    cout << ehNumero("123a5") << endl;      // 0 (false)
    cout << ehAlfabetico("Hello") << endl;  // 1 (true)
    cout << ehAlfabetico("Hello!") << endl; // 0 (false)

    return 0;
}
```

### Exemplo Completo: Processamento de Texto

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string frase = "The Quick Brown Fox";

    // 1. Converter para minúsculas
    transform(frase.begin(), frase.end(), frase.begin(), ::tolower);
    cout << "Minúsculas: " << frase << endl;

    // 2. Contar palavras
    int palavras = 1;
    for (char c : frase) {
        if (c == ' ') palavras++;
    }
    cout << "Número de palavras: " << palavras << endl;

    // 3. Buscar palavra específica
    size_t pos = frase.find("fox");
    if (pos != string::npos) {
        cout << "'fox' encontrado na posição " << pos << endl;
    }

    // 4. Contar vogais
    int vogais = 0;
    for (char c : frase) {
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            vogais++;
        }
    }
    cout << "Número de vogais: " << vogais << endl;

    // 5. Reverter
    reverse(frase.begin(), frase.end());
    cout << "Reverso: " << frase << endl;

    return 0;
}
```

**Saída**:

```
Minúsculas: the quick brown fox
Número de palavras: 4
'fox' encontrado na posição 16
Número de vogais: 5
Reverso: xof nworb kciuq eht
```

---

## Resumo dos Pontos-Chave

1. **Estruturas**: Agrupam dados relacionados em um tipo composto
2. **Operador `.`**: Acessa membros de estrutura (objeto)
3. **Operador `->`**: Acessa membros de estrutura (ponteiro)
4. **Vector de Structs**: Coleção dinâmica de estruturas, útil para listas de dados
5. **std::string**: Classe para manipulação de texto com gerenciamento automático
6. **Concatenação**: `+`, `+=`, `append()` juntam strings
7. **Comparação**: Operadores relacionais comparam lexicograficamente
8. **Busca**: `find()`, `rfind()`, `find_first_of()` localizam substrings
9. **Manipulação**: `substr()`, `replace()`, `insert()`, `erase()` modificam strings
10. **Conversão**: `to_string()`, `stoi()`, `stod()` convertem entre tipos

**Dicas Importantes**:

- Use `struct` para simples agrupamento de dados
- Sempre verifique `string::npos` em operações de busca
- Strings C++ gerenciam memória automaticamente (sem delete necessário)
- Use `const string&` em parâmetros para evitar cópias desnecessárias
- `std::string` é preferível a arrays de char (C-strings)
