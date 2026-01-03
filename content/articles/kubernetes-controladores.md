---
date: 2025-08-15
author: Guilherme Rossi Kirsten
tags:
  [
    Kubernetes,
    Controllers,
    ReplicaSet,
    ReplicationController,
    Alta Disponibilidade,
  ]
---

# Controladores Kubernetes

Os controladores são os "cérebros" do Kubernetes, responsáveis por monitorar objetos e reagir conforme necessário para manter o estado desejado do cluster.

## Introdução aos Controladores

- Os **controladores** são os "cérebros" do Kubernetes
- Eles monitoram os objetos e reagem conforme necessário
- Exemplo de controlador: **ReplicationController**

## Por que precisamos de controladores?

- **Alta disponibilidade**: se um pod falhar, o controlador cria outro
- **Escalabilidade**: aumenta o número de réplicas conforme a demanda
- **Balanceamento de carga**: múltiplos pods podem ser distribuídos em vários nós

## ReplicationController (RC)

- Cria e gerencia múltiplas réplicas de um **pod**
- Garante que um número fixo de pods esteja sempre em execução
- Mesmo com uma só réplica, RC é útil para recriar pods em caso de falha

### Estrutura de definição (YAML)

- `apiVersion: v1`
- `kind: ReplicationController`
- `metadata`: nome, labels
- `spec`: número de réplicas, **template** (definição do pod)

## ReplicaSet (RS) x ReplicationController (RC)

- **ReplicaSet** substitui o RC
- Ambos têm a mesma função: manter o número desejado de pods ativos
- **ReplicaSet** é mais flexível e moderno

### Diferenças principais

| Característica         | ReplicationController | ReplicaSet  |
| ---------------------- | --------------------- | ----------- |
| `apiVersion`           | `v1`                  | `apps/v1`   |
| `selector` obrigatório | ❌                    | ✅          |
| Suporte atual          | Legado                | Recomendado |

## Selectors e Labels

- **Labels**: metadados usados para identificar e agrupar objetos
- **Selector**: necessário no ReplicaSet para **mapear** quais pods ele gerencia
- Se houver pods já criados com os mesmos labels do seletor, o RS os **assume**

## Como funciona o ReplicaSet

- Garante que sempre haja `n` pods com certas labels
- Se houver pods com labels correspondentes, o RS não cria novos até que falte algum
- Se um pod falhar, ele cria um novo com base no **template**

## Escalando um ReplicaSet

Duas formas principais:

### Editando o arquivo YAML

Aplique com:

```bash
kubectl apply -f arquivo.yaml
```

### Linha de comando direta

```bash
kubectl scale replicaset <nome-do-rs> --replicas=6
```

## Exemplo de Definição YAML

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myapp-replicaset
  labels:
    app: myapp
spec:
  selector:
    matchLabels:
      app: myapp
  replicas: 3
  template:
    metadata:
      name: nginx
      labels:
        app: myapp
    spec:
      containers:
        - name: nginx
          image: nginx
```
