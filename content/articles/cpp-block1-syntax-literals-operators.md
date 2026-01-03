---
date: 2025-02-18
author: Guilherme Rossi Kirsten
tags: [C++, Sintaxe, Operadores, Programação, Certificação]
---

# Bloco 1 – Sintaxe, Literais e Operadores

Este bloco cobre os elementos fundamentais da sintaxe C++, incluindo tipos de dados, operadores e entrada/saída básica.

## Resumo do Conteúdo

Este bloco é a base para todo o desenvolvimento em C++. Você aprenderá a identificar elementos sintáticos válidos, trabalhar com diferentes tipos de dados, aplicar operadores corretamente e realizar operações básicas de entrada e saída. Compreender precedência de operadores e avaliação de curto-circuito (short-circuit) é essencial para escrever código eficiente e evitar erros lógicos.

## Identificar elementos sintáticos válidos, palavras-chave e estruturas de código em C++

### Elementos Sintáticos Válidos do C++

C++ possui elementos sintáticos específicos que definem a estrutura do código:

- **Keywords (Palavras-chave)**: Palavras reservadas da linguagem que não podem ser usadas como identificadores
- **Identifiers (Identificadores)**: Nomes de variáveis, funções, classes e outros elementos
- **Operators (Operadores)**: Símbolos que realizam operações sobre dados
- **Separators (Separadores)**: Elementos que delimitam partes do código (`;`, `{}`, `()`, etc.)
- **Literals (Literais)**: Valores constantes escritos diretamente no código

### Palavras-Chave do C++

Palavras reservadas que não podem ser usadas como identificadores. Algumas das mais comuns:

```cpp
// Tipos de dados
int, double, float, char, bool, void, auto

// Controle de fluxo
if, else, switch, case, default, break, continue

// Loops
while, do, for

// Estruturas
class, struct, namespace, using, enum

// Modificadores
const, static, extern, inline, virtual

// Gerenciamento de memória
new, delete

// Outros
return, sizeof, typedef
```

**Explicação**: Essas palavras têm significado especial no C++ e tentativas de usá-las como nomes de variáveis resultarão em erro de compilação.

### Estrutura de Código

```cpp
// Comentário de linha única
// Usado para documentação rápida ou desabilitar código

/* Comentário
   de múltiplas
   linhas para documentação mais extensa */

#include <iostream>  // Diretiva de preprocessador - inclui bibliotecas

using namespace std; // Opcional - permite usar cout em vez de std::cout

int main() {         // Função principal - ponto de entrada do programa
    // Corpo da função
    cout << "Olá, Mundo!" << endl;
    return 0;        // Retorna 0 indicando sucesso
}
```

**Explicação**:

- **#include**: Inclui arquivos de cabeçalho (headers) que contêm declarações de funções e classes
- **using namespace std**: Evita escrever `std::` antes de elementos da biblioteca padrão
- **main()**: Toda aplicação C++ deve ter uma função main() que serve como ponto de entrada
- **return 0**: Convenção que indica execução bem-sucedida ao sistema operacional

### Regras para Identificadores

```cpp
// VÁLIDO
int idade;
int _contador;
int valor1;
int camelCase;
int snake_case;

// INVÁLIDO
int 1valor;       // Não pode começar com número
int meu-valor;    // Não pode conter hífen
int int;          // Não pode usar palavra-chave
int meu valor;    // Não pode conter espaço
```

## Reconhecer tipos de dados nativos do C++ e literais correspondentes

### Tipos de Dados Nativos

**Tipos Inteiros**:

```cpp
// int - Inteiro padrão (normalmente 4 bytes, -2³¹ a 2³¹-1)
int num = 42;

// short - Inteiro curto (normalmente 2 bytes, -32.768 a 32.767)
short s = 10;

// long - Inteiro longo (pelo menos 4 bytes)
long l = 100000L;

// long long - Inteiro muito longo (pelo menos 8 bytes)
long long ll = 9223372036854775807LL;

// unsigned - Apenas valores positivos (dobra o limite superior)
unsigned int positivo = 4294967295U;
```

**Explicação**:

- Inteiros armazenam números sem parte decimal
- `unsigned` remove valores negativos, dobrando o alcance positivo
- Sufixos `L`, `LL`, `U` indicam o tipo do literal

**Tipos de Ponto Flutuante**:

```cpp
// float - Precisão simples (4 bytes, ~7 dígitos decimais)
float f = 3.14f;

// double - Precisão dupla (8 bytes, ~15 dígitos decimais)
double d = 3.14159265359;

// long double - Precisão estendida (10-16 bytes)
long double ld = 3.14159265358979323846L;
```

**Explicação**:

- Use `float` para economizar memória quando precisão não é crítica
- `double` é o padrão para cálculos científicos e financeiros
- Sempre adicione `f` ao final de literais float para evitar conversão implícita

**Tipos de Caractere**:

```cpp
// char - Um único caractere (1 byte, ASCII)
char c = 'A';
char letra = 65;  // Código ASCII de 'A'

// wchar_t - Caractere largo (para Unicode)
wchar_t wc = L'A';
```

**Tipo Booleano**:

```cpp
// bool - Verdadeiro ou falso (1 byte)
bool flag = true;
bool flag2 = false;

// Conversão implícita
bool resultado = 5;  // true (qualquer número diferente de 0)
bool zero = 0;       // false
```

**Tipo Void**:

```cpp
// void - Ausência de tipo
void funcaoSemRetorno();  // Função que não retorna valor
void* ptr;                // Ponteiro genérico
```

### Literais

**Literais Inteiros**:

```cpp
// Decimal (base 10) - formato padrão
int decimal = 42;

// Octal (base 8) - prefixo 0
int octal = 052;        // Equivale a 42 em decimal

// Hexadecimal (base 16) - prefixo 0x ou 0X
int hex = 0x2A;         // Equivale a 42 em decimal

// Binário (base 2) - prefixo 0b (C++14)
int binary = 0b101010;  // Equivale a 42 em decimal

// Com separadores (C++14) - melhor legibilidade
int grande = 1'000'000;  // Um milhão
```

**Literais de Ponto Flutuante**:

```cpp
// Notação padrão
double d1 = 3.14;

// Notação científica
double d2 = 3.14e2;     // 3.14 × 10² = 314.0
double d3 = 2.5e-3;     // 2.5 × 10⁻³ = 0.0025

// Com sufixo de tipo
float f = 3.14f;        // Float
long double ld = 3.14L; // Long double
```

**Literais de Caractere**:

```cpp
// Caractere simples
char c = 'A';

// Sequências de escape
char newline = '\n';    // Nova linha
char tab = '\t';        // Tabulação
char backslash = '\\';  // Barra invertida
char quote = '\'';      // Aspas simples
char nulo = '\0';       // Caractere nulo (fim de string)

// Código Unicode
char unicode = '\u0041';  // 'A'
```

**Literais de String**:

```cpp
// String C-style (array de caracteres terminado em \0)
const char* str = "Olá, Mundo!";

// String C++ (std::string)
string texto = "C++ moderno";

// String literal crua (C++11) - ignora sequências de escape
string caminho = R"(C:\Usuário\Documentos\arquivo.txt)";
```

**Literais Booleanos**:

```cpp
bool verdadeiro = true;   // 1
bool falso = false;       // 0
```

**Literal nullptr**:

```cpp
// nullptr - ponteiro nulo type-safe (C++11)
int* ptr = nullptr;

// Substitui NULL do C
// int* old_ptr = NULL;  // Estilo antigo, evite
```

## Descrever a estrutura e declaração da função main() e seus parâmetros

### Função main() Básica

```cpp
int main() {
    // Código do programa
    return 0;  // Retorna 0 = sucesso
}
```

**Explicação**:

- Toda aplicação C++ deve ter exatamente uma função `main()`
- O tipo de retorno deve ser `int`
- `return 0` indica que o programa terminou com sucesso
- Qualquer outro valor indica erro ou condição anormal

### main() com Argumentos de Linha de Comando

```cpp
int main(int argc, char* argv[]) {
    // argc: argument count - número de argumentos
    // argv: argument vector - array de strings com os argumentos

    cout << "Número de argumentos: " << argc << endl;

    // O primeiro argumento (argv[0]) é sempre o nome do programa
    cout << "Nome do programa: " << argv[0] << endl;

    // Processar argumentos
    for (int i = 1; i < argc; i++) {
        cout << "Argumento " << i << ": " << argv[i] << endl;
    }

    return 0;
}
```

**Exemplo de uso**:

```bash
./programa arg1 arg2 arg3
# argc = 4
# argv[0] = "./programa"
# argv[1] = "arg1"
# argv[2] = "arg2"
# argv[3] = "arg3"
```

### Declaração Alternativa

```cpp
int main(int argc, char** argv) {
    // Equivalente a char* argv[]
    // argv é um ponteiro para ponteiros de char
    return 0;
}
```

**Explicação**: `char* argv[]` e `char** argv` são equivalentes porque arrays decaem para ponteiros quando passados como parâmetros.

### Valores de Retorno

```cpp
int main() {
    bool sucesso = processar();

    if (sucesso) {
        return 0;      // Sucesso (EXIT_SUCCESS)
    } else {
        return 1;      // Erro genérico (EXIT_FAILURE)
    }

    // Códigos de erro personalizados
    // return 2;  // Arquivo não encontrado
    // return 3;  // Permissão negada
    // return 4;  // Memória insuficiente
}
```

**Explicação**:

- **0 (EXIT_SUCCESS)**: Indica execução bem-sucedida
- **Não-zero (EXIT_FAILURE)**: Indica erro - o valor específico pode comunicar o tipo de erro ao sistema operacional ou scripts

## Aplicar operadores aritméticos, relacionais, lógicos, bitwise e de atribuição

### Operadores Aritméticos

```cpp
int a = 10, b = 3;

// Operações básicas
int soma = a + b;           // Adição: 13
int diferenca = a - b;      // Subtração: 7
int produto = a * b;        // Multiplicação: 30
int quociente = a / b;      // Divisão inteira: 3 (não 3.33!)
int resto = a % b;          // Módulo (resto): 1

// Operadores unários
int x = 5;
int positivo = +x;          // Unário mais: 5
int negativo = -x;          // Unário menos: -5

// Incremento e decremento
int n = 10;
n++;                        // Pós-incremento: usa depois incrementa
++n;                        // Pré-incremento: incrementa depois usa
n--;                        // Pós-decremento
--n;                        // Pré-decremento
```

**Diferença entre pré e pós-incremento**:

```cpp
int a = 5;
int b = a++;  // b = 5, a = 6 (usa o valor antes de incrementar)

int c = 5;
int d = ++c;  // d = 6, c = 6 (incrementa antes de usar)
```

**Cuidado com divisão inteira**:

```cpp
int resultado1 = 7 / 2;      // 3 (não 3.5!)
double resultado2 = 7 / 2;   // 3.0 (ainda inteiro, depois convertido)
double resultado3 = 7.0 / 2; // 3.5 (divisão de ponto flutuante)
double resultado4 = 7 / 2.0; // 3.5
double resultado5 = static_cast<double>(7) / 2; // 3.5 (casting explícito)
```

### Operadores Relacionais

```cpp
int a = 10, b = 20;

bool igual = (a == b);          // Igual a: false
bool diferente = (a != b);      // Diferente de: true
bool menor = (a < b);           // Menor que: true
bool maior = (a > b);           // Maior que: false
bool menorIgual = (a <= b);     // Menor ou igual: true
bool maiorIgual = (a >= b);     // Maior ou igual: false
```

**Explicação**: Operadores relacionais sempre retornam um valor booleano (`true` ou `false`). São usados principalmente em condicionais e loops.

**Cuidado comum**:

```cpp
int x = 5;

// ERRADO - atribuição, não comparação
if (x = 10) {  // Sempre true, x agora é 10!
    // ...
}

// CORRETO - comparação
if (x == 10) {
    // ...
}
```

### Operadores Lógicos

```cpp
bool a = true, b = false;

// AND lógico - true se ambos forem true
bool e = a && b;            // false

// OR lógico - true se pelo menos um for true
bool ou = a || b;           // true

// NOT lógico - inverte o valor
bool nao = !a;              // false

// Expressões complexas
bool resultado = (x > 5) && (y < 10) || !flag;
```

**Tabela verdade AND (&&)**:

```
true  && true  = true
true  && false = false
false && true  = false
false && false = false
```

**Tabela verdade OR (||)**:

```
true  || true  = true
true  || false = true
false || true  = true
false || false = false
```

### Operadores Bitwise (Bit a Bit)

```cpp
int a = 5;   // Binário: 0101
int b = 3;   // Binário: 0011

// AND bit a bit - 1 se ambos os bits forem 1
int and_bit = a & b;     // 0001 = 1

// OR bit a bit - 1 se pelo menos um bit for 1
int or_bit = a | b;      // 0111 = 7

// XOR bit a bit - 1 se os bits forem diferentes
int xor_bit = a ^ b;     // 0110 = 6

// NOT bit a bit - inverte todos os bits
int not_bit = ~a;        // 1010 (complemento de dois) = -6

// Deslocamento à esquerda - multiplica por 2^n
int esquerda = a << 1;   // 1010 = 10 (5 * 2¹)
int esquerda2 = a << 2;  // 10100 = 20 (5 * 2²)

// Deslocamento à direita - divide por 2^n
int direita = a >> 1;    // 0010 = 2 (5 / 2¹)
```

**Aplicações práticas**:

```cpp
// Verificar se um número é par
bool ehPar = (num & 1) == 0;  // Mais rápido que num % 2 == 0

// Multiplicar por potência de 2
int resultado = num << 3;  // Multiplica por 8 (2³)

// Dividir por potência de 2
int resultado = num >> 2;  // Divide por 4 (2²)

// Manipular flags
const int FLAG_A = 1;      // 0001
const int FLAG_B = 2;      // 0010
const int FLAG_C = 4;      // 0100

int flags = FLAG_A | FLAG_C;     // Ativar A e C
bool temFlagA = (flags & FLAG_A) != 0;  // Verificar se tem A
flags &= ~FLAG_C;                // Desativar C
flags ^= FLAG_B;                 // Alternar B
```

### Operadores de Atribuição

```cpp
int x = 10;

// Atribuição simples
x = 20;

// Atribuição composta (combina operação com atribuição)
x += 5;   // x = x + 5;   resultado: 25
x -= 3;   // x = x - 3;   resultado: 22
x *= 2;   // x = x * 2;   resultado: 44
x /= 4;   // x = x / 4;   resultado: 11
x %= 5;   // x = x % 5;   resultado: 1

// Atribuição bitwise
x &= 3;   // x = x & 3;
x |= 2;   // x = x | 2;
x ^= 1;   // x = x ^ 1;
x <<= 2;  // x = x << 2;
x >>= 1;  // x = x >> 1;
```

**Encadeamento de atribuições**:

```cpp
int a, b, c;
a = b = c = 10;  // Todos recebem 10 (avaliação da direita para esquerda)
```

## Determinar precedência, associatividade de operadores e impacto em expressões

### Precedência de Operadores (do maior para o menor)

```cpp
// 1. Mais alta: Pós-fixos
//    () [] -> . ++ --

// 2. Unários
//    ++ -- ! ~ + - * & sizeof

// 3. Multiplicativos
//    * / %

// 4. Aditivos
//    + -

// 5. Deslocamento
//    << >>

// 6. Relacionais
//    < <= > >=

// 7. Igualdade
//    == !=

// 8. AND bitwise
//    &

// 9. XOR bitwise
//    ^

// 10. OR bitwise
//     |

// 11. AND lógico
//     &&

// 12. OR lógico
//     ||

// 13. Condicional ternário
//     ?:

// 14. Atribuição
//     = += -= *= /= %= &= |= ^= <<= >>=

// 15. Mais baixa: Vírgula
//     ,
```

### Exemplos de Precedência

```cpp
// Exemplo 1: Multiplicação antes de adição
int resultado = 2 + 3 * 4;  // 14, não 20
// Avaliação: 2 + (3 * 4) = 2 + 12 = 14

// Com parênteses para mudar a ordem
resultado = (2 + 3) * 4;    // 20
// Avaliação: (2 + 3) * 4 = 5 * 4 = 20

// Exemplo 2: Relacionais antes de lógicos
bool teste = 5 > 3 && 10 < 20;  // true
// Avaliação: (5 > 3) && (10 < 20) = true && true = true

// Exemplo 3: Incremento
int x = 5;
int y = x++ * 2;  // y = 10, x = 6
// Avaliação: usa x (5), multiplica por 2, depois incrementa x

int a = 5;
int b = ++a * 2;  // b = 12, a = 6
// Avaliação: incrementa a (6), depois multiplica por 2
```

### Associatividade

```cpp
// Associatividade à esquerda (maioria dos operadores)
int resultado = 10 - 5 - 2;  // 3, não 7
// Avaliação: (10 - 5) - 2 = 5 - 2 = 3

// Associatividade à direita (atribuição)
int x, y, z;
x = y = z = 10;
// Avaliação: x = (y = (z = 10))
// Primeiro z = 10, depois y = z (10), depois x = y (10)

// Operador ternário (direita para esquerda)
int a = 1, b = 2, c = 3;
int resultado = a ? b : c ? 10 : 20;
// Avaliação: a ? b : (c ? 10 : 20)
```

**Dica**: Quando em dúvida sobre precedência, use parênteses! Tornam o código mais legível:

```cpp
// Menos claro
if (a && b || c && d) { }

// Mais claro
if ((a && b) || (c && d)) { }
```

## Aplicar lógica de curto-circuito (short-circuit) em expressões de controle

### Avaliação de Curto-Circuito

**AND Lógico (&&)**:

```cpp
// Se o operando esquerdo for false, o direito NÃO é avaliado
bool resultado = false && funcaoCaraOMAS();  // funcao() não é chamada!
```

**Explicação**: Como `false && qualquerCoisa` sempre resulta em `false`, o C++ otimiza não avaliando o segundo operando.

**OR Lógico (||)**:

```cpp
// Se o operando esquerdo for true, o direito NÃO é avaliado
bool resultado = true || funcaoCara();  // funcao() não é chamada!
```

**Explicação**: Como `true || qualquerCoisa` sempre resulta em `true`, não há necessidade de avaliar o segundo operando.

### Exemplos Práticos

**Evitar divisão por zero**:

```cpp
int a = 10, b = 0;

// PERIGOSO - pode causar divisão por zero
if (a / b > 2) {  // ERRO! Divisão por zero
    // ...
}

// SEGURO - verifica b antes de dividir
if (b != 0 && a / b > 2) {  // Se b == 0, a divisão não acontece
    // ...
}
```

**Verificar ponteiro nulo**:

```cpp
int* ptr = nullptr;

// PERIGOSO - desreferencia ponteiro nulo
if (*ptr > 5) {  // ERRO! Ponteiro nulo
    // ...
}

// SEGURO - verifica ponteiro antes de desreferenciar
if (ptr != nullptr && *ptr > 5) {  // Se ptr é null, *ptr não é avaliado
    // ...
}
```

**Verificar limites de array**:

```cpp
int arr[10];
int indice = 15;

// PERIGOSO - acesso fora dos limites
if (arr[indice] > 0) {  // ERRO! Índice inválido
    // ...
}

// SEGURO - verifica limites antes de acessar
if (indice >= 0 && indice < 10 && arr[indice] > 0) {
    // Só acessa arr[indice] se o índice for válido
}
```

**String vazia**:

```cpp
string texto = "";

// PERIGOSO - pode acessar posição inválida
if (texto[0] == 'A') {  // Problema se string vazia
    // ...
}

// SEGURO - verifica tamanho primeiro
if (!texto.empty() && texto[0] == 'A') {
    // Só acessa texto[0] se a string não estiver vazia
}
```

**Otimização de performance**:

```cpp
// Coloque a condição mais barata/provável primeiro
if (condicaoRapida() && funcaoLenta()) {
    // Se condicaoRapida() retornar false, funcaoLenta() não é executada
}

// Em OR, coloque a condição que mais provavelmente será true primeiro
if (condicaoComum() || condicaoRara()) {
    // Se condicaoComum() for true, condicaoRara() não é executada
}
```

## Usar streams de entrada/saída básicos (cin, cout, cerr) e manipuladores (endl, setw)

### Saída Básica com cout

```cpp
#include <iostream>
using namespace std;

// Saída simples
cout << "Olá, Mundo!" << endl;

// Múltiplos valores
int idade = 25;
string nome = "João";
cout << "Nome: " << nome << ", Idade: " << idade << endl;

// Sem quebra de linha
cout << "Parte 1 ";
cout << "Parte 2\n";  // \n também funciona, mas endl flush o buffer
```

**Explicação**:

- `cout` = **C**haracter **OUT**put (saída de caracteres)
- `<<` = Operador de inserção (insere dados no stream)
- `endl` = End Line + flush do buffer (força escrita imediata)

### Entrada Básica com cin

```cpp
#include <iostream>
using namespace std;

int idade;
cout << "Digite sua idade: ";
cin >> idade;  // Lê até encontrar espaço ou Enter

string nome;
cout << "Digite seu nome: ";
cin >> nome;  // Lê apenas até o primeiro espaço

// Para ler uma linha inteira (com espaços)
string nomeCompleto;
cout << "Digite nome completo: ";
cin.ignore();  // Limpa o buffer do Enter anterior
getline(cin, nomeCompleto);
```

**Explicação**:

- `cin` = **C**haracter **IN**put (entrada de caracteres)
- `>>` = Operador de extração (extrai dados do stream)
- `cin.ignore()` = Remove caracteres do buffer
- `getline()` = Lê uma linha inteira incluindo espaços

**Múltiplas entradas**:

```cpp
int a, b, c;
cout << "Digite três números: ";
cin >> a >> b >> c;  // Usuário digita: 10 20 30 [Enter]
```

### Saída de Erros com cerr

```cpp
#include <iostream>
using namespace std;

// cerr é usado para mensagens de erro
cerr << "ERRO: Arquivo não encontrado!" << endl;

// Diferença: cerr não usa buffer (output imediato)
cout << "Mensagem normal" << endl;  // Pode ser armazenada temporariamente
cerr << "Erro crítico!" << endl;    // Escrito imediatamente
```

**Explicação**: `cerr` é usado para erros porque:

- Não usa buffer (unbuffered) - mensagens aparecem imediatamente
- Pode ser redirecionado separadamente de `cout` em sistemas Unix/Linux

### Manipuladores de Formato

```cpp
#include <iostream>
#include <iomanip>  // Necessário para setw, setprecision, etc.
using namespace std;

// endl - Quebra linha e flush do buffer
cout << "Linha 1" << endl;
cout << "Linha 2" << endl;

// setw - Define largura do campo (apenas para próxima inserção)
cout << setw(10) << 42 << endl;        // "        42" (alinhado à direita)
cout << setw(10) << "Olá" << endl;     // "       Olá"

// left e right - Alinhamento
cout << left << setw(10) << "Esquerda" << "|" << endl;   // "Esquerda  |"
cout << right << setw(10) << "Direita" << "|" << endl;   // "   Direita|"

// setfill - Define caractere de preenchimento
cout << setfill('0') << setw(5) << 42 << endl;  // "00042"
cout << setfill(' ');  // Volta ao padrão

// setprecision - Define precisão decimal
double pi = 3.14159265359;
cout << setprecision(4) << pi << endl;  // "3.142"
cout << setprecision(6) << pi << endl;  // "3.14159"

// fixed - Notação de ponto fixo
cout << fixed << setprecision(2) << pi << endl;  // "3.14"

// scientific - Notação científica
cout << scientific << pi << endl;  // "3.14e+00"

// boolalpha - Mostra bool como texto
bool flag = true;
cout << flag << endl;              // "1"
cout << boolalpha << flag << endl; // "true"
cout << noboolalpha << flag << endl; // "1" (volta ao padrão)

// showpos - Mostra sinal + para positivos
cout << showpos << 42 << endl;     // "+42"
cout << noshowpos << 42 << endl;   // "42"
```

### Exemplo Completo: Tabela Formatada

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    cout << left << setw(15) << "Produto"
         << right << setw(10) << "Preço"
         << setw(10) << "Qtd" << endl;

    cout << string(35, '-') << endl;  // Linha de separação

    cout << left << setw(15) << "Notebook"
         << right << setw(10) << fixed << setprecision(2) << 2500.50
         << setw(10) << 5 << endl;

    cout << left << setw(15) << "Mouse"
         << right << setw(10) << 29.99
         << setw(10) << 20 << endl;

    return 0;
}
```

**Saída**:

```
Produto              Preço       Qtd
-----------------------------------
Notebook          2500.50         5
Mouse               29.99        20
```

### Exemplo Completo de E/S

```cpp
#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    // Entrada
    string nome;
    int idade;
    double salario;

    cout << "=== CADASTRO ===" << endl;
    cout << "Nome completo: ";
    getline(cin, nome);

    cout << "Idade: ";
    cin >> idade;

    cout << "Salário: R$ ";
    cin >> salario;

    // Saída formatada
    cout << "\n=== DADOS CADASTRADOS ===" << endl;
    cout << left << setw(12) << "Nome:" << nome << endl;
    cout << left << setw(12) << "Idade:" << idade << " anos" << endl;
    cout << left << setw(12) << "Salário:" << "R$ "
         << fixed << setprecision(2) << salario << endl;

    return 0;
}
```

---

## Resumo dos Pontos-Chave

1. **Sintaxe**: Conhecer palavras-chave, estrutura de código e regras para identificadores
2. **Tipos de Dados**: int, double, float, char, bool - escolher o tipo adequado economiza memória
3. **Literais**: Diferentes formas de representar valores (decimal, hex, binário, strings)
4. **main()**: Ponto de entrada obrigatório, pode receber argumentos de linha de comando
5. **Operadores**: Aritméticos, relacionais, lógicos, bitwise - cada um com uso específico
6. **Precedência**: Conhecer a ordem de avaliação evita erros lógicos
7. **Short-circuit**: Otimização importante e técnica de segurança
8. **I/O**: cin para entrada, cout para saída, cerr para erros, manipuladores para formatação
