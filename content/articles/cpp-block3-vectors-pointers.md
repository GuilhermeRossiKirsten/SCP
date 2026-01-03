---
date: 2025-07-29
author: Guilherme Rossi Kirsten
tags: [C++, Vetores, Ponteiros, Arrays, Gerenciamento de Memória, Certificação]
---

# Bloco 3 – Vetores e Ponteiros

Este bloco aborda vetores, arrays e ponteiros em C++, incluindo gerenciamento de memória dinâmica.

## Resumo do Conteúdo

Vetores e ponteiros são fundamentais para manipulação eficiente de dados em C++. Você aprenderá a trabalhar com arrays estáticos e dinâmicos, usar vectors da STL, manipular ponteiros com segurança e gerenciar memória dinâmica. Compreender esses conceitos é essencial para programação eficiente e evitar erros comuns como memory leaks e acessos inválidos.

## Declarar, inicializar e manipular vetores e arrays, incluindo arrays multidimensionais

### Declaração e Inicialização de Arrays

```cpp
// Declaração simples
int numeros[5];  // Array de 5 inteiros (valores indefinidos)

// Inicialização com valores
int valores[5] = {1, 2, 3, 4, 5};

// Inicialização parcial (resto preenchido com 0)
int parcial[5] = {1, 2};  // {1, 2, 0, 0, 0}

// Dedução automática de tamanho
int auto_size[] = {1, 2, 3, 4, 5};  // Tamanho é 5

// Inicialização com zeros
int zeros[5] = {0};   // Todos os elementos são 0
int zeros2[5] = {};   // Todos os elementos são 0 (C++11)
```

**Explicação**:

- Arrays têm tamanho fixo definido em tempo de compilação
- Elementos não inicializados contêm "lixo" de memória
- Arrays começam no índice 0 (zero-based indexing)
- Tamanho deve ser constante ou literal

### Manipulação de Arrays

```cpp
int arr[5] = {1, 2, 3, 4, 5};

// Acessar elementos
int primeiro = arr[0];   // 1
int ultimo = arr[4];     // 5

// Modificar elementos
arr[2] = 10;  // arr agora é {1, 2, 10, 4, 5}

// PERIGO: Acesso fora dos limites (sem verificação!)
// arr[10] = 100;  // Comportamento indefinido!

// Iterar através do array (for tradicional)
for (int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}

// Range-based for loop (C++11) - mais seguro
for (int valor : arr) {
    cout << valor << " ";
}

// Modificar com range-based for
for (int& valor : arr) {
    valor *= 2;  // Dobra cada elemento
}
```

**Tamanho do array**:

```cpp
int arr[10];
int tamanho = sizeof(arr) / sizeof(arr[0]);  // 10

// CUIDADO: Não funciona quando array decai para ponteiro
void funcao(int arr[]) {
    int tam = sizeof(arr) / sizeof(arr[0]);  // ERRADO! arr é ponteiro aqui
}
```

### Arrays Multidimensionais

```cpp
// Array 2D (matriz)
int matriz[3][4];  // 3 linhas, 4 colunas

// Inicialização de array 2D
int grid[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// Forma alternativa
int grid2[3][4] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};

// Acessar elementos
int elemento = grid[1][2];  // 7 (linha 1, coluna 2)

// Modificar
grid[0][0] = 100;

// Iterar através de array 2D
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        cout << grid[i][j] << " ";
    }
    cout << endl;
}
```

**Explicação**:

- `int matriz[3][4]` = 3 linhas × 4 colunas = 12 elementos total
- Armazenado em memória como sequência contígua (row-major order)
- `matriz[i][j]` acessa linha i, coluna j

**Array 3D**:

```cpp
// Cubo 3D: 2 camadas × 3 linhas × 4 colunas
int cubo[2][3][4];

// Inicialização
int cubo3d[2][3][4] = {
    {  // Camada 0
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    },
    {  // Camada 1
        {13, 14, 15, 16},
        {17, 18, 19, 20},
        {21, 22, 23, 24}
    }
};

// Acessar
int valor = cubo3d[1][2][3];  // Camada 1, linha 2, coluna 3 = 24

// Iterar
for (int k = 0; k < 2; k++) {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << cubo3d[k][i][j] << " ";
        }
        cout << endl;
    }
    cout << "---" << endl;
}
```

### Uso de std::vector

```cpp
#include <vector>
using namespace std;

// Declaração
vector<int> vec;  // Vector vazio

// Inicialização
vector<int> numeros = {1, 2, 3, 4, 5};
vector<int> comTamanho(10);        // 10 elementos, valor padrão (0)
vector<int> preenchido(10, 5);     // 10 elementos, todos com valor 5
vector<int> copia(numeros);        // Cópia de outro vector

// Adicionar elementos
vec.push_back(10);
vec.push_back(20);
vec.push_back(30);

// Acessar elementos
int primeiro = vec[0];        // Sem verificação de limites
int segundo = vec.at(1);      // Com verificação de limites (mais seguro)

// Tamanho e capacidade
int tamanho = vec.size();     // Número de elementos
int capacidade = vec.capacity();  // Capacidade alocada

// Verificar se vazio
bool vazio = vec.empty();

// Remover último elemento
vec.pop_back();

// Limpar todos os elementos
vec.clear();

// Redimensionar
vec.resize(20);  // Aumenta para 20 elementos

// Reservar capacidade (otimização)
vec.reserve(100);  // Aloca espaço para 100 elementos
```

**Iteração em vectors**:

```cpp
vector<int> v = {10, 20, 30, 40, 50};

// Índice tradicional
for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
}

// Range-based for
for (int valor : v) {
    cout << valor << " ";
}

// Com referência (para modificar)
for (int& valor : v) {
    valor *= 2;
}

// Iteradores
for (auto it = v.begin(); it != v.end(); ++it) {
    cout << *it << " ";
}
```

**Vantagens do vector sobre arrays**:

- ✅ Tamanho dinâmico (cresce automaticamente)
- ✅ Gerenciamento automático de memória
- ✅ Métodos úteis (push_back, pop_back, insert, erase)
- ✅ Seguro com at() (lança exceção se índice inválido)

## Acessar dados do vector usando o método data()

### Método data()

```cpp
#include <vector>
using namespace std;

vector<int> vec = {1, 2, 3, 4, 5};

// Obter ponteiro para array subjacente
int* ptr = vec.data();

// Acessar elementos através do ponteiro
cout << ptr[0] << endl;  // 1
cout << ptr[1] << endl;  // 2

// Modificar elementos
ptr[0] = 100;
cout << vec[0] << endl;  // 100 (vector foi modificado)

// Iterar usando ponteiro
for (int i = 0; i < vec.size(); i++) {
    cout << ptr[i] << " ";
}
```

**Explicação**:

- `data()` retorna ponteiro para o primeiro elemento do array interno
- Útil para interoperabilidade com APIs C que esperam arrays
- Modificações via ponteiro afetam o vector original

### Usando data() com Funções

```cpp
// Função C-style que espera array
void processarArray(int* arr, int tamanho) {
    for (int i = 0; i < tamanho; i++) {
        arr[i] *= 2;
    }
}

int main() {
    vector<int> vec = {1, 2, 3, 4, 5};

    // Passar dados do vector para função que espera array
    processarArray(vec.data(), vec.size());

    // vec agora é {2, 4, 6, 8, 10}
    for (int valor : vec) {
        cout << valor << " ";
    }

    return 0;
}
```

**⚠️ Cuidados com data()**:

- Ponteiro pode ser invalidado se vector for redimensionado
- Não acesse além de `vec.size()` elementos
- Não delete o ponteiro (memória gerenciada pelo vector)

```cpp
vector<int> vec = {1, 2, 3};
int* ptr = vec.data();

vec.push_back(4);  // Pode causar realocação
// ptr pode estar inválido agora!

// Solução: Reobt' + 'er ponteiro após modificações
ptr = vec.data();
```

## Declarar e inicializar ponteiros, incluindo o uso de nullptr

### Declaração de Ponteiros

```cpp
// Ponteiro para int
int* ptr;
int *ptr2;  // Estilo alternativo (mesmo significado)

// Ponteiro para double
double* dptr;

// Ponteiro para char
char* cptr;

// Múltiplos ponteiros (cuidado com a sintaxe!)
int *p1, *p2, *p3;  // Três ponteiros
int* q1, q2, q3;    // q1 é ponteiro, q2 e q3 são int!
```

### Inicialização de Ponteiros

```cpp
// Inicializar com endereço de variável
int num = 10;
int* ptr = &num;  // ptr aponta para num

// Inicializar com nullptr (C++11) - RECOMENDADO
int* nullPtr = nullptr;

// Inicializar com NULL (estilo C antigo)
int* oldNull = NULL;

// Inicializar com 0 (ainda mais antigo)
int* zeroPtr = 0;

// PERIGO: Ponteiro não inicializado
int* perigoso;  // Contém lixo - NUNCA use sem inicializar!
```

**Explicação**:

- `&` = operador de endereço (obtém endereço da variável)
- `nullptr` é type-safe e deve ser preferido
- Sempre inicialize ponteiros (use `nullptr` se não tiver endereço)

### nullptr vs NULL vs 0

```cpp
// nullptr é type-safe (C++11)
void funcao(int* ptr) {
    cout << "Versão ponteiro" << endl;
}

void funcao(int valor) {
    cout << "Versão inteiro" << endl;
}

int main() {
    funcao(nullptr);  // Chama versão ponteiro (correto)
    funcao(NULL);     // Ambíguo! Pode chamar versão inteiro
    funcao(0);        // Chama versão inteiro

    return 0;
}
```

**Por que nullptr é melhor**:

- Type-safe: não pode ser confundido com inteiro
- Funciona corretamente em templates
- Mais clara intenção do código

### Verificar nullptr

```cpp
int* ptr = nullptr;

// Verificação explícita
if (ptr == nullptr) {
    cout << "Ponteiro é nulo" << endl;
}

// Verificação implícita
if (!ptr) {
    cout << "Ponteiro é nulo" << endl;
}

if (ptr) {
    cout << "Ponteiro válido" << endl;
}

// SEMPRE verifique antes de desreferenciar
if (ptr != nullptr) {
    cout << *ptr << endl;  // Seguro
}
```

**Exemplo de uso seguro**:

```cpp
int* criarInteiro(int valor) {
    int* p = new int(valor);
    return p;
}

int main() {
    int* ptr = criarInteiro(42);

    if (ptr != nullptr) {
        cout << "Valor: " << *ptr << endl;
        delete ptr;
        ptr = nullptr;  // Boa prática
    }

    return 0;
}
```

## Desreferenciar ponteiros e usar o operador de endereço (&)

### Operador de Endereço (&)

```cpp
int num = 42;

// Obter endereço da variável
int* ptr = &num;

// Imprimir endereço (hexadecimal)
cout << "Endereço: " << ptr << endl;          // ex: 0x7fff5fbff5ac
cout << "Endereço: " << &num << endl;         // Mesmo endereço

// Endereço de diferentes tipos
double valor = 3.14;
double* dptr = &valor;

char letra = 'A';
char* cptr = &letra;
```

**Explicação**: `&variavel` retorna o endereço de memória onde a variável está armazenada.

### Operador de Desreferenciação (\*)

```cpp
int num = 42;
int* ptr = &num;

// Desreferenciar para obter valor
cout << "Valor: " << *ptr << endl;  // 42

// Modificar valor através do ponteiro
*ptr = 100;
cout << "Novo valor: " << num << endl;  // 100

// Operadores & e * são inversos
int x = 10;
int* p = &x;   // p = endereço de x
int y = *p;    // y = valor em p (10)
```

**Relação entre variável, ponteiro e memória**:

```
num = 42
&num = 0x1000 (endereço)

ptr = 0x1000 (armazena o endereço de num)
*ptr = 42 (valor apontado)
```

### Aritmética de Ponteiros

```cpp
int arr[5] = {10, 20, 30, 40, 50};
int* ptr = arr;  // Array decai para ponteiro

// Acessar elementos usando aritmética
cout << *ptr << endl;        // 10
cout << *(ptr + 1) << endl;  // 20
cout << *(ptr + 2) << endl;  // 30

// Incrementar ponteiro
ptr++;
cout << *ptr << endl;  // 20

// Decrementar ponteiro
ptr--;
cout << *ptr << endl;  // 10

// Notação de array com ponteiros
cout << ptr[0] << endl;  // 10 (equivalente a *ptr)
cout << ptr[1] << endl;  // 20 (equivalente a *(ptr+1))
```

**Explicação**:

- `ptr + n` avança n elementos (não n bytes!)
- Para `int*`, `ptr + 1` avança 4 bytes (tamanho de int)
- Para `double*`, `ptr + 1` avança 8 bytes

**Diferença entre elementos**:

```cpp
int arr[10];
int* primeiro = &arr[0];
int* quinto = &arr[4];

int distancia = quinto - primeiro;  // 4 (elementos, não bytes)
```

### Ponteiro para Ponteiro

```cpp
int num = 42;
int* ptr = &num;
int** pptr = &ptr;  // Ponteiro para ponteiro

// Desreferenciar
cout << **pptr << endl;  // 42

// Modificar valor através de ponteiro duplo
**pptr = 100;
cout << num << endl;  // 100

// Níveis de indireção
cout << num << endl;    // 100 (valor)
cout << *ptr << endl;   // 100 (através de ptr)
cout << **pptr << endl; // 100 (através de pptr)
```

**Quando usar ponteiro para ponteiro**:

- Funções que modificam ponteiros
- Arrays de ponteiros (strings em C)
- Matrizes alocadas dinamicamente

```cpp
void alocar(int** p) {
    *p = new int(50);  // Modifica o ponteiro original
}

int main() {
    int* ptr = nullptr;
    alocar(&ptr);  // Passa endereço do ponteiro
    cout << *ptr << endl;  // 50
    delete ptr;
    return 0;
}
```

## Realizar conversões de ponteiros usando static_cast e dynamic_cast

### static_cast para Ponteiros

```cpp
// Conversão entre tipos de ponteiro relacionados

// 1. Upcast (Derivada → Base) - sempre seguro
class Base {};
class Derivada : public Base {};

Derivada* d = new Derivada();
Base* b = static_cast<Base*>(d);  // Seguro

// 2. Downcast (Base → Derivada) - PERIGOSO sem verificação
Base* base = new Derivada();
Derivada* der = static_cast<Derivada*>(base);  // Sem verificação de tipo!

// 3. Conversão via void*
int num = 65;
int* iptr = &num;

void* vptr = static_cast<void*>(iptr);
char* cptr = static_cast<char*>(vptr);
```

**Explicação**:

- `static_cast` faz conversão em tempo de compilação
- Não verifica se a conversão é válida em runtime
- Use apenas quando tiver certeza do tipo

**Cuidado com static_cast**:

```cpp
class Animal {};
class Cachorro : public Animal {};
class Gato : public Animal {};

Animal* animal = new Gato();
// PERIGO! animal é na verdade um Gato
Cachorro* cachorro = static_cast<Cachorro*>(animal);  // Compila, mas ERRADO!
// Usar cachorro pode causar comportamento indefinido
```

### dynamic_cast para Tipos Polimórficos

```cpp
class Base {
    virtual ~Base() {}  // Pelo menos uma função virtual necessária
public:
    virtual void falar() { cout << "Base" << endl; }
};

class Derivada : public Base {
public:
    void falar() override { cout << "Derivada" << endl; }
    void metodoEspecifico() { cout << "Só em Derivada" << endl; }
};

int main() {
    Base* base = new Derivada();

    // Downcast seguro com verificação em runtime
    Derivada* derivada = dynamic_cast<Derivada*>(base);

    if (derivada != nullptr) {
        cout << "Cast bem-sucedido!" << endl;
        derivada->metodoEspecifico();
    } else {
        cout << "Cast falhou!" << endl;
    }

    delete base;
    return 0;
}
```

**Explicação**:

- `dynamic_cast` verifica o tipo em runtime
- Retorna `nullptr` se o cast for inválido
- Requer pelo menos uma função virtual na classe base
- Tem custo de performance (RTTI)

### dynamic_cast com Segurança

```cpp
class Animal {
    virtual ~Animal() {}
};

class Cachorro : public Animal {
public:
    void latir() { cout << "Au au!" << endl; }
};

class Gato : public Animal {
public:
    void miar() { cout << "Miau!" << endl; }
};

void interagir(Animal* animal) {
    // Tentar converter para Cachorro
    Cachorro* cachorro = dynamic_cast<Cachorro*>(animal);
    if (cachorro != nullptr) {
        cachorro->latir();
        return;
    }

    // Tentar converter para Gato
    Gato* gato = dynamic_cast<Gato*>(animal);
    if (gato != nullptr) {
        gato->miar();
        return;
    }

    cout << "Tipo desconhecido" << endl;
}

int main() {
    Animal* animal1 = new Cachorro();
    Animal* animal2 = new Gato();

    interagir(animal1);  // Au au!
    interagir(animal2);  // Miau!

    delete animal1;
    delete animal2;
    return 0;
}
```

### static_cast vs dynamic_cast

| Aspecto         | static_cast                     | dynamic_cast                       |
| --------------- | ------------------------------- | ---------------------------------- |
| **Verificação** | Compile-time                    | Runtime                            |
| **Performance** | Rápido                          | Mais lento (RTTI)                  |
| **Segurança**   | Sem verificação                 | Retorna nullptr se inválido        |
| **Requisito**   | Nenhum                          | Classe polimórfica (virtual)       |
| **Uso**         | Conversões conhecidas e seguras | Downcasts que precisam verificação |

**Quando usar cada um**:

- **static_cast**: Conversões que você sabe serem seguras
- **dynamic_cast**: Downcasts onde o tipo real não é conhecido

## Gerenciar memória dinâmica com new, delete e delete[]

### Alocação Dinâmica com new

```cpp
// Alocar um único inteiro
int* ptr = new int;
*ptr = 42;

// Alocar com inicialização
int* ptr2 = new int(100);

// Alocar double
double* dptr = new double(3.14);

// Alocar estrutura
struct Ponto {
    int x, y;
};
Ponto* p = new Ponto;
p->x = 10;
p->y = 20;
```

**Explicação**:

- `new` aloca memória no heap (livre para crescer)
- Retorna ponteiro para a memória alocada
- Memória persiste até ser explicitamente liberada com `delete`
- Se alocação falhar, lança exceção `std::bad_alloc`

### Alocação Dinâmica de Arrays

```cpp
// Alocar array de inteiros
int tamanho = 5;
int* arr = new int[tamanho];

// Inicializar array
for (int i = 0; i < tamanho; i++) {
    arr[i] = i * 10;
}

// Acessar elementos
cout << arr[2] << endl;  // 20

// Alocar com tamanho em runtime
cout << "Digite o tamanho: ";
int n;
cin >> n;
double* dinamico = new double[n];
```

**Diferença entre new e new[]**:

```cpp
int* unico = new int(5);      // Aloca 1 int
int* array = new int[5];       // Aloca 5 ints
int* array2 = new int[5]{};    // Aloca 5 ints, inicializa com 0 (C++11)
int* array3 = new int[5]{1,2,3,4,5};  // Com valores iniciais
```

### Desalocar Memória com delete

```cpp
// Deletar objeto único
int* ptr = new int(42);
delete ptr;        // Libera memória
ptr = nullptr;     // Boa prática

// Deletar array
int* arr = new int[10];
delete[] arr;      // Note o []
arr = nullptr;
```

**⚠️ IMPORTANTE**:

- Use `delete` para objetos únicos (`new`)
- Use `delete[]` para arrays (`new[]`)
- Misturar causa comportamento indefinido!

```cpp
int* arr = new int[10];
delete arr;    // ERRADO! Deve ser delete[]
// Pode causar corrupção de memória ou crash
```

### Memory Leak (Vazamento de Memória)

```cpp
// RUIM: Memory leak
void funcaoProblematica() {
    int* ptr = new int(42);
    // Esqueceu de fazer delete!
}  // ptr é destruído, mas memória continua alocada!

// BOM: Limpeza adequada
void funcaoCorreta() {
    int* ptr = new int(42);
    // Usar ptr
    delete ptr;
    ptr = nullptr;
}
```

**Consequências de memory leak**:

- Memória nunca é liberada
- Aplicação consome cada vez mais memória
- Pode causar travamento do sistema

### Exemplo Completo de Gerenciamento

```cpp
int main() {
    // 1. Alocar valor único
    int* num = new int(100);
    cout << *num << endl;
    delete num;
    num = nullptr;

    // 2. Alocar array
    int tamanho = 5;
    int* arr = new int[tamanho];

    // Inicializar
    for (int i = 0; i < tamanho; i++) {
        arr[i] = (i + 1) * 10;
    }

    // Usar array
    for (int i = 0; i < tamanho; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    // Limpar
    delete[] arr;
    arr = nullptr;

    return 0;
}
```

### Array 2D Dinâmico

```cpp
// Alocar matriz dinâmica (linhas × colunas)
int linhas = 3, colunas = 4;
int** matriz = new int*[linhas];

for (int i = 0; i < linhas; i++) {
    matriz[i] = new int[colunas];
}

// Inicializar
for (int i = 0; i < linhas; i++) {
    for (int j = 0; j < colunas; j++) {
        matriz[i][j] = i * colunas + j;
    }
}

// Usar matriz
for (int i = 0; i < linhas; i++) {
    for (int j = 0; j < colunas; j++) {
        cout << matriz[i][j] << " ";
    }
    cout << endl;
}

// Limpar (ordem inversa da alocação)
for (int i = 0; i < linhas; i++) {
    delete[] matriz[i];
}
delete[] matriz;
matriz = nullptr;
```

### Melhores Práticas

```cpp
// ✅ Sempre inicialize ponteiros
int* ptr = nullptr;

// ✅ Verifique antes de desreferenciar
if (ptr != nullptr) {
    *ptr = 10;
}

// ✅ Delete e defina como nullptr
delete ptr;
ptr = nullptr;

// ✅ Use delete[] para arrays
int* arr = new int[10];
delete[] arr;

// ✅ Evite double delete
int* p = new int(42);
delete p;
// delete p;  // PERIGO! Double delete
p = nullptr;
delete p;  // Seguro: delete nullptr não faz nada

// ❌ Nunca delete ponteiro não-heap
int x = 10;
int* p2 = &x;
// delete p2;  // ERRO! x não foi alocado com new

// ❌ Nunca delete duas vezes
int* p3 = new int(5);
delete p3;
delete p3;  // PERIGO! Comportamento indefinido
```

### RAII e Smart Pointers (Alternativa Moderna)

```cpp
#include <memory>

// Ao invés de gerenciar manualmente com new/delete
void estiloAntigo() {
    int* ptr = new int(42);
    // ... usar ptr ...
    delete ptr;  // Fácil esquecer!
}

// Use smart pointers (gerenciamento automático)
void estiloModerno() {
    auto ptr = make_unique<int>(42);
    // ... usar ptr ...
    // delete automático quando sai do escopo!
}

// Vector ao invés de arrays dinâmicos
void melhorOpcao() {
    vector<int> v(10);  // Mais seguro que new int[10]
    // Memória liberada automaticamente
}
```

---

## Resumo dos Pontos-Chave

1. **Arrays**: Tamanho fixo, índice começa em 0, sem verificação de limites
2. **Vectors**: Tamanho dinâmico, métodos úteis, gerenciamento automático
3. **data()**: Acessa array interno do vector para interop com C
4. **Ponteiros**: Armazenam endereços de memória, use nullptr
5. **&**: Operador de endereço (obtém endereço da variável)
6. **\***: Operador de desreferenciação (obtém valor do ponteiro)
7. **static_cast**: Conversão em compile-time, sem verificação
8. **dynamic_cast**: Conversão em runtime, segura mas mais lenta
9. **new/delete**: Gerenciamento manual de memória dinâmica
10. **delete[]**: Sempre use para arrays alocados com new[]

**Regras de Ouro**:

- Sempre inicialize ponteiros
- Sempre libere memória alocada
- Nunca delete dois vezes
- Prefira smart pointers e vectors em código moderno
