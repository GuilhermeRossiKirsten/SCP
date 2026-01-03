---
date: 2025-05-14
author: Guilherme Rossi Kirsten
tags: [C++, Controle de Fluxo, Funções, Loops, Programação, Certificação]
---

# Bloco 2 – Controle de Fluxo e Funções

Este bloco aborda estruturas de controle de fluxo e funções em C++.

## Resumo do Conteúdo

Controle de fluxo permite que seu programa tome decisões e execute ações repetidas. Funções permitem organizar código em blocos reutilizáveis. Este bloco é essencial para escrever programas dinâmicos que respondem a diferentes situações e processam dados de forma eficiente.

## Descrever e usar declarações condicionais (if, else)

### Declaração if Básica

```cpp
int idade = 18;

if (idade >= 18) {
    cout << "Você é maior de idade." << endl;
}
```

**Explicação**:

- A condição `idade >= 18` é avaliada
- Se for `true`, o bloco entre `{}` é executado
- Se for `false`, o bloco é ignorado e o programa continua

**Sem chaves (apenas uma instrução)**:

```cpp
if (idade >= 18)
    cout << "Maior de idade" << endl;  // Apenas esta linha faz parte do if

// MAS é melhor sempre usar chaves para evitar erros:
if (idade >= 18) {
    cout << "Maior de idade" << endl;
}
```

### Declaração if-else

```cpp
int num = 10;

if (num % 2 == 0) {
    cout << "Número par" << endl;
} else {
    cout << "Número ímpar" << endl;
}
```

**Explicação**:

- Se a condição for `true`, executa o primeiro bloco
- Se for `false`, executa o bloco `else`
- Exatamente um dos blocos será executado

### Cadeia if-else-if

```cpp
int nota = 85;

if (nota >= 90) {
    cout << "Conceito: A (Excelente)" << endl;
} else if (nota >= 80) {
    cout << "Conceito: B (Bom)" << endl;
} else if (nota >= 70) {
    cout << "Conceito: C (Regular)" << endl;
} else if (nota >= 60) {
    cout << "Conceito: D (Suficiente)" << endl;
} else {
    cout << "Conceito: F (Reprovado)" << endl;
}
```

**Explicação**:

- As condições são avaliadas em ordem, de cima para baixo
- Assim que uma condição for `true`, seu bloco é executado
- Os demais `else if` e `else` são ignorados
- O bloco `else` final é opcional e executa se nenhuma condição for verdadeira

**Exemplo prático - Calculadora de IMC**:

```cpp
double peso = 70.0, altura = 1.75;
double imc = peso / (altura * altura);

cout << "IMC: " << fixed << setprecision(2) << imc << " - ";

if (imc < 18.5) {
    cout << "Abaixo do peso" << endl;
} else if (imc < 25) {
    cout << "Peso normal" << endl;
} else if (imc < 30) {
    cout << "Sobrepeso" << endl;
} else {
    cout << "Obesidade" << endl;
}
```

### if's Aninhados (Nested)

```cpp
int x = 10, y = 20;

if (x > 0) {
    if (y > 0) {
        cout << "Ambos positivos" << endl;
    } else {
        cout << "x positivo, y negativo ou zero" << endl;
    }
} else {
    if (y > 0) {
        cout << "x negativo ou zero, y positivo" << endl;
    } else {
        cout << "Ambos negativos ou zero" << endl;
    }
}
```

**Explicação**: if's podem ser colocados dentro de outros if's para criar lógica mais complexa. Cuidado com a legibilidade - muitos níveis de aninhamento tornam o código difícil de entender.

**Operador Ternário** (forma compacta de if-else):

```cpp
// Sintaxe: condição ? valor_se_true : valor_se_false

int idade = 20;
string status = (idade >= 18) ? "Maior" : "Menor";
// Equivalente a:
// if (idade >= 18) status = "Maior"; else status = "Menor";

// Pode ser aninhado (mas evite abusar)
int num = 15;
string tipo = (num > 0) ? "Positivo" : (num < 0) ? "Negativo" : "Zero";
```

## Usar construções de loop (while, do, for) e instruções de controle de loop (break, continue)

### Loop while

```cpp
int contador = 1;

while (contador <= 5) {
    cout << contador << " ";
    contador++;
}
// Saída: 1 2 3 4 5
```

**Explicação**:

- A condição é verificada **antes** de cada iteração
- Se for `false` desde o início, o loop nunca executa
- Use quando não souber quantas iterações serão necessárias

**Exemplo - Validação de entrada**:

```cpp
int senha;
bool acesso = false;

while (!acesso) {
    cout << "Digite a senha: ";
    cin >> senha;

    if (senha == 1234) {
        acesso = true;
        cout << "Acesso concedido!" << endl;
    } else {
        cout << "Senha incorreta. Tente novamente." << endl;
    }
}
```

**Loop infinito intencional**:

```cpp
while (true) {
    // Código do servidor que roda indefinidamente
    processarRequisicoes();

    if (deveEncerrar()) {
        break;  // Sai do loop
    }
}
```

### Loop do-while

```cpp
int num;

do {
    cout << "Digite um número positivo: ";
    cin >> num;
} while (num <= 0);

cout << "Você digitou: " << num << endl;
```

**Explicação**:

- A condição é verificada **depois** de cada iteração
- O bloco **sempre executa pelo menos uma vez**
- Útil para menus e validação de entrada

**Diferença entre while e do-while**:

```cpp
// while - pode não executar
int x = 10;
while (x < 5) {
    cout << "Nunca imprime" << endl;  // Não executa
}

// do-while - sempre executa pelo menos uma vez
int y = 10;
do {
    cout << "Imprime uma vez" << endl;  // Executa 1 vez
} while (y < 5);
```

**Menu interativo**:

```cpp
int opcao;

do {
    cout << "\n=== MENU ===" << endl;
    cout << "1. Cadastrar" << endl;
    cout << "2. Consultar" << endl;
    cout << "3. Sair" << endl;
    cout << "Escolha: ";
    cin >> opcao;

    switch (opcao) {
        case 1:
            cout << "Cadastrando..." << endl;
            break;
        case 2:
            cout << "Consultando..." << endl;
            break;
        case 3:
            cout << "Saindo..." << endl;
            break;
        default:
            cout << "Opção inválida!" << endl;
    }
} while (opcao != 3);
```

### Loop for

```cpp
// Sintaxe: for (inicialização; condição; incremento)
for (int i = 0; i < 5; i++) {
    cout << i << " ";
}
// Saída: 0 1 2 3 4
```

**Explicação dos componentes**:

1. **Inicialização**: `int i = 0` - executada uma vez no início
2. **Condição**: `i < 5` - verificada antes de cada iteração
3. **Incremento**: `i++` - executado após cada iteração

**Variações do for**:

```cpp
// Contagem regressiva
for (int i = 10; i >= 0; i--) {
    cout << i << " ";
}
// Saída: 10 9 8 7 6 5 4 3 2 1 0

// Incremento de 2 em 2
for (int i = 0; i <= 10; i += 2) {
    cout << i << " ";
}
// Saída: 0 2 4 6 8 10

// Múltiplas variáveis
for (int i = 0, j = 10; i < j; i++, j--) {
    cout << "i=" << i << " j=" << j << endl;
}

// Loop infinito
for (;;) {
    // Equivalente a while(true)
    if (condicaoParada()) break;
}
```

**Range-based for (C++11)** - Iteração simplificada:

```cpp
int numeros[] = {10, 20, 30, 40, 50};

// Forma tradicional
for (int i = 0; i < 5; i++) {
    cout << numeros[i] << " ";
}

// Range-based for (mais limpo)
for (int num : numeros) {
    cout << num << " ";
}

// Com referência (para modificar)
for (int& num : numeros) {
    num *= 2;  // Dobra cada elemento
}

// Com const (apenas leitura)
for (const int& num : numeros) {
    cout << num << " ";
}
```

### Instrução break

```cpp
// Sai do loop imediatamente
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;  // Para quando i é 5
    }
    cout << i << " ";
}
// Saída: 0 1 2 3 4
```

**Explicação**: `break` termina o loop mais interno imediatamente, continuando a execução após o loop.

**Busca em array**:

```cpp
int numeros[] = {3, 7, 2, 9, 5, 1, 8};
int alvo = 9;
bool encontrado = false;

for (int i = 0; i < 7; i++) {
    if (numeros[i] == alvo) {
        cout << "Encontrado na posição " << i << endl;
        encontrado = true;
        break;  // Para de procurar
    }
}

if (!encontrado) {
    cout << "Não encontrado" << endl;
}
```

**Em switch**:

```cpp
int opcao = 2;

switch (opcao) {
    case 1:
        cout << "Opção 1" << endl;
        break;  // Sai do switch
    case 2:
        cout << "Opção 2" << endl;
        break;
    default:
        cout << "Outra opção" << endl;
}
```

### Instrução continue

```cpp
// Pula para a próxima iteração
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;  // Pula números pares
    }
    cout << i << " ";
}
// Saída: 1 3 5 7 9
```

**Explicação**: `continue` pula o restante da iteração atual e vai para a próxima verificação da condição.

**Processar apenas valores válidos**:

```cpp
int numeros[] = {10, -5, 20, 0, 30, -10, 40};

for (int num : numeros) {
    if (num <= 0) {
        continue;  // Ignora negativos e zero
    }
    cout << "Processando: " << num << endl;
}
// Processa apenas: 10, 20, 30, 40
```

**Diferença entre break e continue**:

```cpp
// break - sai do loop completamente
for (int i = 0; i < 5; i++) {
    if (i == 3) break;
    cout << i << " ";
}
// Saída: 0 1 2

// continue - pula apenas a iteração atual
for (int i = 0; i < 5; i++) {
    if (i == 3) continue;
    cout << i << " ";
}
// Saída: 0 1 2 4
```

## Reconhecer o propósito da instrução goto e declarações rotuladas

### Instrução goto

```cpp
int x = 5;

if (x < 10) {
    goto rotulo;  // Pula para o rótulo
}

cout << "Isto não será impresso" << endl;

rotulo:
    cout << "Pulou para aqui" << endl;
```

**Explicação**: `goto` realiza um salto incondicional para um rótulo (label) especificado no código.

### goto com Loops Aninhados

```cpp
// Uso legítimo: sair de múltiplos loops
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (i * j > 10) {
            goto sair_loops;  // Sai de ambos os loops
        }
        cout << "(" << i << "," << j << ") ";
    }
}

sair_loops:
    cout << "\nSaiu dos loops aninhados" << endl;
```

**Sem goto (mais verboso)**:

```cpp
bool sair = false;
for (int i = 0; i < 5 && !sair; i++) {
    for (int j = 0; j < 5; j++) {
        if (i * j > 10) {
            sair = true;
            break;
        }
        cout << "(" << i << "," << j << ") ";
    }
}
```

### Quando Usar goto

**✅ Casos aceitáveis**:

- Sair de loops profundamente aninhados
- Código de tratamento de erro em C legado
- Máquinas de estado simples

**❌ Evite goto quando**:

- Pode usar break, continue ou return
- Torna o fluxo do código difícil de seguir
- Viola princípios de programação estruturada

**Exemplo de tratamento de erro (estilo C)**:

```cpp
bool processarArquivo() {
    File* arquivo = nullptr;
    char* buffer = nullptr;
    bool sucesso = false;

    arquivo = abrirArquivo("dados.txt");
    if (arquivo == nullptr) {
        goto cleanup;
    }

    buffer = alocarBuffer(1024);
    if (buffer == nullptr) {
        goto cleanup;
    }

    // Processar arquivo...
    sucesso = true;

cleanup:
    if (buffer != nullptr) free(buffer);
    if (arquivo != nullptr) fecharArquivo(arquivo);
    return sucesso;
}
```

**Melhor alternativa em C++ moderno**:

```cpp
bool processarArquivo() {
    // Use RAII, smart pointers, exceções
    auto arquivo = make_unique<File>("dados.txt");
    vector<char> buffer(1024);
    // Limpeza automática
    return true;
}
```

## Aplicar estruturas de seleção múltipla usando switch, case e default

### Declaração switch Básica

```cpp
int dia = 3;

switch (dia) {
    case 1:
        cout << "Segunda-feira" << endl;
        break;
    case 2:
        cout << "Terça-feira" << endl;
        break;
    case 3:
        cout << "Quarta-feira" << endl;
        break;
    case 4:
        cout << "Quinta-feira" << endl;
        break;
    case 5:
        cout << "Sexta-feira" << endl;
        break;
    case 6:
        cout << "Sábado" << endl;
        break;
    case 7:
        cout << "Domingo" << endl;
        break;
    default:
        cout << "Dia inválido" << endl;
}
```

**Explicação**:

- `switch` avalia a expressão uma vez
- Compara com cada `case` até encontrar correspondência
- `break` é necessário para sair do switch
- `default` é executado se nenhum case corresponder

**Tipos permitidos no switch**:

- Inteiros: `int`, `short`, `long`, `char`
- Enumerações: `enum`
- NÃO aceita: `float`, `double`, `string`

### Fall-Through (queda intencional)

```cpp
char nota = 'B';

switch (nota) {
    case 'A':
    case 'B':
        cout << "Aprovado com distinção!" << endl;
        break;
    case 'C':
        cout << "Aprovado" << endl;
        break;
    case 'D':
        cout << "Aprovado com ressalvas" << endl;
        break;
    case 'F':
        cout << "Reprovado" << endl;
        break;
    default:
        cout << "Nota inválida" << endl;
}
```

**Explicação**: Quando não há `break`, a execução "cai" para o próximo case. Isso permite agrupar casos com a mesma ação.

**Calculadora simples**:

```cpp
char operacao;
double a, b;

cout << "Digite dois números: ";
cin >> a >> b;
cout << "Operação (+, -, *, /): ";
cin >> operacao;

switch (operacao) {
    case '+':
        cout << "Resultado: " << (a + b) << endl;
        break;
    case '-':
        cout << "Resultado: " << (a - b) << endl;
        break;
    case '*':
        cout << "Resultado: " << (a * b) << endl;
        break;
    case '/':
        if (b != 0) {
            cout << "Resultado: " << (a / b) << endl;
        } else {
            cout << "Erro: Divisão por zero!" << endl;
        }
        break;
    default:
        cout << "Operação inválida!" << endl;
}
```

### switch com Inicialização (C++17)

```cpp
switch (int valor = getValor(); valor) {
    case 1:
        cout << "Um" << endl;
        break;
    case 2:
        cout << "Dois" << endl;
        break;
    default:
        cout << "Outro: " << valor << endl;
}
// valor não existe mais após o switch
```

**switch vs if-else-if**:

```cpp
// switch - mais eficiente para múltiplos valores específicos
switch (codigo) {
    case 100: /* ... */ break;
    case 200: /* ... */ break;
    case 300: /* ... */ break;
}

// if-else - necessário para ranges e condições complexas
if (nota >= 90) {
    // ...
} else if (nota >= 80) {
    // ...
}
```

## Definir, declarar e invocar funções com sintaxe correta

### Declaração de Função (Protótipo)

```cpp
// Declaração - informa ao compilador sobre a existência da função
int somar(int a, int b);
void imprimirMensagem();
double calcularArea(double raio);
bool ehPar(int numero);
```

**Explicação**:

- Deve aparecer antes do primeiro uso da função
- Geralmente colocada no topo do arquivo ou em header (.h)
- Não contém implementação, apenas assinatura

### Definição de Função (Implementação)

```cpp
// Definição - implementa o comportamento da função
int somar(int a, int b) {
    return a + b;
}

void imprimirMensagem() {
    cout << "Olá, Mundo!" << endl;
}

double calcularArea(double raio) {
    const double PI = 3.14159;
    return PI * raio * raio;
}

bool ehPar(int numero) {
    return (numero % 2 == 0);
}
```

**Componentes de uma função**:

1. **Tipo de retorno**: O que a função retorna (`int`, `void`, etc.)
2. **Nome**: Identificador da função
3. **Parâmetros**: Lista de entradas (pode ser vazia)
4. **Corpo**: Código entre `{}`

### Invocação (Chamada) de Função

```cpp
int main() {
    // Chamando funções
    int resultado = somar(5, 3);
    cout << "Soma: " << resultado << endl;  // 8

    imprimirMensagem();  // Olá, Mundo!

    double area = calcularArea(5.0);
    cout << "Área: " << area << endl;  // 78.5398

    if (ehPar(10)) {
        cout << "10 é par" << endl;
    }

    return 0;
}
```

### Parâmetros Padrão (Default Parameters)

```cpp
// Declaração com valores padrão
void saudar(string nome = "Visitante", int vezes = 1);

// Definição
void saudar(string nome, int vezes) {
    for (int i = 0; i < vezes; i++) {
        cout << "Olá, " << nome << "!" << endl;
    }
}

// Uso
saudar();                    // Usa ambos padrões
saudar("João");              // Usa padrão para vezes
saudar("Maria", 3);          // Sem padrões
```

**Regras para parâmetros padrão**:

- Devem estar à direita (após parâmetros sem padrão)
- Definidos apenas na declaração (não na implementação)

```cpp
// CORRETO
void func(int a, int b = 10, int c = 20);

// ERRADO
void func(int a = 10, int b, int c);  // Padrão no meio
```

### Sobrecarga de Funções (Function Overloading)

```cpp
// Múltiplas funções com o mesmo nome, mas parâmetros diferentes

int somar(int a, int b) {
    return a + b;
}

double somar(double a, double b) {
    return a + b;
}

int somar(int a, int b, int c) {
    return a + b + c;
}

// Uso
cout << somar(5, 3) << endl;        // 8 (int)
cout << somar(5.5, 3.2) << endl;    // 8.7 (double)
cout << somar(1, 2, 3) << endl;     // 6 (três parâmetros)
```

**O compilador escolhe baseado em**:

- Número de parâmetros
- Tipo dos parâmetros
- **NÃO** no tipo de retorno

## Usar instruções return em funções com tipo e funções void

### return em Funções com Tipo

```cpp
// Retorna um valor do tipo especificado
int quadrado(int n) {
    return n * n;
}

double dividir(double a, double b) {
    if (b == 0) {
        return 0.0;  // Retorno de erro
    }
    return a / b;
}

bool ehPositivo(int n) {
    return (n > 0);
}
```

**Explicação**:

- Função **deve** retornar um valor do tipo declarado
- `return` termina a função imediatamente
- Pode haver múltiplos `return` em diferentes caminhos

**Múltiplos pontos de retorno**:

```cpp
int encontrarMaximo(int a, int b, int c) {
    if (a >= b && a >= c) {
        return a;
    }
    if (b >= a && b >= c) {
        return b;
    }
    return c;
}

// Ou usando operador ternário
int encontrarMaximo2(int a, int b, int c) {
    return (a >= b) ? ((a >= c) ? a : c) : ((b >= c) ? b : c);
}
```

**Expressões no return**:

```cpp
int calcularTotal(int quantidade, double preco) {
    return quantidade * preco * 1.1;  // Com 10% de taxa
}

string getStatus(int codigo) {
    return (codigo == 200) ? "OK" : "Erro";
}
```

### return em Funções void

```cpp
// void = não retorna valor
void imprimirArray(int arr[], int tamanho) {
    for (int i = 0; i < tamanho; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    // return não é necessário (opcional no final)
}

// return sem valor para saída antecipada
void processarValor(int valor) {
    if (valor < 0) {
        cout << "Valor inválido" << endl;
        return;  // Sai da função imediatamente
    }

    cout << "Processando: " << valor << endl;
    // Mais processamento...
}
```

**Explicação**:

- Funções `void` não retornam valor
- `return;` (sem valor) pode ser usado para sair antecipadamente
- Se não houver `return`, a função termina no final do bloco

**Validação com retorno antecipado**:

```cpp
void configurarSistema(int usuario, int senha) {
    if (usuario <= 0) {
        cerr << "Erro: Usuário inválido" << endl;
        return;
    }

    if (senha < 1000) {
        cerr << "Erro: Senha muito curta" << endl;
        return;
    }

    // Apenas executa se ambas validações passarem
    cout << "Sistema configurado com sucesso" << endl;
    inicializarComponentes();
}
```

## Passar argumentos por valor, por referência e por ponteiro

### Passagem por Valor

```cpp
void modificarValor(int x) {
    x = 100;  // Modifica apenas a cópia local
    cout << "Dentro da função: " << x << endl;  // 100
}

int main() {
    int num = 10;
    modificarValor(num);
    cout << "Fora da função: " << num << endl;  // 10 (não mudou)
    return 0;
}
```

**Explicação**:

- Uma **cópia** do valor é criada
- Mudanças dentro da função não afetam a variável original
- Seguro, mas pode ser ineficiente para objetos grandes

**Quando usar**:

- Tipos primitivos pequenos (int, char, bool)
- Quando não quer que a função modifique o original
- Valores que a função não deve alterar

### Passagem por Referência

```cpp
void modificarReferencia(int& x) {
    x = 100;  // Modifica a variável original
    cout << "Dentro da função: " << x << endl;  // 100
}

int main() {
    int num = 10;
    modificarReferencia(num);
    cout << "Fora da função: " << num << endl;  // 100 (mudou!)
    return 0;
}
```

**Explicação**:

- `&` indica que é uma **referência** ao original
- Não há cópia - opera diretamente na variável original
- Eficiente para objetos grandes

**Referência constante** (não pode modificar):

```cpp
void imprimirVector(const vector<int>& v) {
    // const impede modificação
    for (int num : v) {
        cout << num << " ";
    }
    // v.push_back(10);  // ERRO! const impede modificação
}
```

**Trocar valores**:

```cpp
void trocar(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    cout << "Antes: x=" << x << " y=" << y << endl;  // 5, 10
    trocar(x, y);
    cout << "Depois: x=" << x << " y=" << y << endl; // 10, 5
    return 0;
}
```

### Passagem por Ponteiro

```cpp
void modificarPonteiro(int* x) {
    *x = 100;  // Desreferencia e modifica o valor original
    cout << "Dentro da função: " << *x << endl;  // 100
}

int main() {
    int num = 10;
    modificarPonteiro(&num);  // Passa o endereço
    cout << "Fora da função: " << num << endl;  // 100 (mudou!)
    return 0;
}
```

**Explicação**:

- `*` no parâmetro indica ponteiro
- `&num` passa o endereço da variável
- `*x` dentro da função desreferencia o ponteiro
- Pode verificar se é `nullptr`

**Verificação de ponteiro nulo**:

```cpp
void processarDados(int* ptr) {
    if (ptr == nullptr) {
        cerr << "Erro: Ponteiro nulo!" << endl;
        return;
    }

    cout << "Valor: " << *ptr << endl;
    *ptr *= 2;
}

int main() {
    int valor = 50;
    int* p1 = &valor;
    int* p2 = nullptr;

    processarDados(p1);  // OK
    processarDados(p2);  // Imprime erro

    return 0;
}
```

### Comparação dos Três Métodos

```cpp
// 1. Por valor - cria cópia
void porValor(int x) {
    x = 100;
}

// 2. Por referência - acessa original diretamente
void porReferencia(int& x) {
    x = 100;
}

// 3. Por ponteiro - acessa via endereço
void porPonteiro(int* x) {
    *x = 100;
}

int main() {
    int a = 1, b = 2, c = 3;

    porValor(a);           // a continua 1
    porReferencia(b);      // b vira 100
    porPonteiro(&c);       // c vira 100

    cout << "a=" << a << " b=" << b << " c=" << c << endl;
    // Saída: a=1 b=100 c=100

    return 0;
}
```

**Quando usar cada um**:

| Método             | Quando Usar                                      |
| ------------------ | ------------------------------------------------ |
| **Por Valor**      | Tipos pequenos que não devem ser modificados     |
| **Por Referência** | Objetos grandes ou quando precisa modificar      |
| **Por Ponteiro**   | Quando nullptr é possível, ou em código C legado |

## Aplicar recursão básica para resolver problemas simples

### Conceito de Recursão

**Recursão** é quando uma função chama a si mesma. Toda função recursiva precisa de:

1. **Caso base**: Condição que para a recursão
2. **Caso recursivo**: Chamada da função para si mesma com problema menor

### Fatorial - Exemplo Clássico

```cpp
// n! = n × (n-1) × (n-2) × ... × 2 × 1
// 5! = 5 × 4 × 3 × 2 × 1 = 120

int fatorial(int n) {
    // Caso base
    if (n <= 1) {
        return 1;
    }

    // Caso recursivo
    return n * fatorial(n - 1);
}

// Uso
cout << fatorial(5) << endl;  // 120
```

**Como funciona** (fatorial(5)):

```
fatorial(5) = 5 * fatorial(4)
            = 5 * (4 * fatorial(3))
            = 5 * (4 * (3 * fatorial(2)))
            = 5 * (4 * (3 * (2 * fatorial(1))))
            = 5 * (4 * (3 * (2 * 1)))
            = 5 * (4 * (3 * 2))
            = 5 * (4 * 6)
            = 5 * 24
            = 120
```

### Sequência de Fibonacci

```cpp
// Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21...
// F(n) = F(n-1) + F(n-2)

int fibonacci(int n) {
    // Casos base
    if (n == 0) return 0;
    if (n == 1) return 1;

    // Caso recursivo
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Uso
for (int i = 0; i < 10; i++) {
    cout << fibonacci(i) << " ";
}
// Saída: 0 1 1 2 3 5 8 13 21 34
```

**⚠️ Cuidado**: Esta versão é ineficiente para valores grandes (recalcula mesmos valores).

### Soma de Array

```cpp
int somarArray(int arr[], int tamanho) {
    // Caso base
    if (tamanho == 0) {
        return 0;
    }

    // Caso recursivo
    return arr[tamanho - 1] + somarArray(arr, tamanho - 1);
}

// Uso
int numeros[] = {1, 2, 3, 4, 5};
cout << somarArray(numeros, 5) << endl;  // 15
```

**Como funciona** (soma de [1,2,3,4,5]):

```
somarArray([1,2,3,4,5], 5) = 5 + somarArray([1,2,3,4], 4)
                            = 5 + (4 + somarArray([1,2,3], 3))
                            = 5 + (4 + (3 + somarArray([1,2], 2)))
                            = 5 + (4 + (3 + (2 + somarArray([1], 1))))
                            = 5 + (4 + (3 + (2 + (1 + somarArray([], 0)))))
                            = 5 + (4 + (3 + (2 + (1 + 0))))
                            = 15
```

### Potência (Exponenciação)

```cpp
// base^expoente
int potencia(int base, int expoente) {
    // Caso base
    if (expoente == 0) {
        return 1;
    }

    // Caso recursivo
    return base * potencia(base, expoente - 1);
}

// Uso
cout << potencia(2, 3) << endl;   // 2³ = 8
cout << potencia(5, 2) << endl;   // 5² = 25
```

### Contagem Regressiva

```cpp
void contagemRegressiva(int n) {
    // Caso base
    if (n == 0) {
        cout << "Fim!" << endl;
        return;
    }

    // Caso recursivo
    cout << n << " ";
    contagemRegressiva(n - 1);
}

// Uso
contagemRegressiva(5);
// Saída: 5 4 3 2 1 Fim!
```

### Máximo Divisor Comum (MDC) - Algoritmo de Euclides

```cpp
int mdc(int a, int b) {
    // Caso base
    if (b == 0) {
        return a;
    }

    // Caso recursivo
    return mdc(b, a % b);
}

// Uso
cout << mdc(48, 18) << endl;  // 6
cout << mdc(100, 35) << endl; // 5
```

### Inversão de String

```cpp
string inverter(string str) {
    // Caso base
    if (str.length() <= 1) {
        return str;
    }

    // Caso recursivo
    return inverter(str.substr(1)) + str[0];
}

// Uso
cout << inverter("hello") << endl;  // "olleh"
cout << inverter("recursao") << endl; // "oasrucer"
```

### Recursão vs Iteração

**Mesma função (soma) de duas formas**:

```cpp
// Versão recursiva
int somaRecursiva(int n) {
    if (n == 0) return 0;
    return n + somaRecursiva(n - 1);
}

// Versão iterativa
int somaIterativa(int n) {
    int soma = 0;
    for (int i = 1; i <= n; i++) {
        soma += i;
    }
    return soma;
}

// Ambas calculam: 1 + 2 + 3 + ... + n
```

**Quando usar recursão**:

- ✅ Problema naturalmente recursivo (árvores, grafos)
- ✅ Código mais limpo e elegante
- ✅ Divide o problema em subproblemas menores

**Quando evitar recursão**:

- ❌ Performance crítica (overhead de chamadas)
- ❌ Pode causar stack overflow em entradas grandes
- ❌ Mais difícil de debugar

---

## Resumo dos Pontos-Chave

1. **if/else**: Decisões baseadas em condições booleanas
2. **Loops**: while (condição antes), do-while (condição depois), for (contagem)
3. **break**: Sai do loop imediatamente
4. **continue**: Pula para próxima iteração
5. **goto**: Evite exceto para sair de loops aninhados
6. **switch**: Seleção múltipla eficiente para valores específicos
7. **Funções**: Organizam código em blocos reutilizáveis
8. **Parâmetros**: Por valor (cópia), por referência (original), por ponteiro (endereço)
9. **Recursão**: Função que chama a si mesma - precisa de caso base
