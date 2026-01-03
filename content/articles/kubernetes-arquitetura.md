---
date: 2025-04-22
author: Guilherme Rossi Kirsten
tags: [Kubernetes, Arquitetura, Control Plane, Worker Nodes]
---

# Arquitetura do Kubernetes

A arquitetura do Kubernetes é composta por um conjunto de componentes que trabalham juntos para gerenciar e orquestrar contêineres em um cluster distribuído.

## Cluster

- Conjunto de máquinas (físicas ou virtuais) trabalhando juntas
- Formado por:
  - **Nó Mestre (Control Plane)**
  - **Nós de Trabalho (Worker Nodes)**

## Nó (Node)

- Uma máquina, **física ou virtual**, com Kubernetes instalado
- Onde os **contêineres** são executados

### Se um nó falhar

- O Kubernetes redistribui os contêineres para outros nós
- Por isso, é importante ter **alta disponibilidade** (mais de um nó no cluster)

## Nó Mestre (Control Plane)

Responsável por **gerenciar o cluster** e orquestrar onde e como os contêineres são executados.

### Componentes principais

| Componente             | Função                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| **API Server**         | Porta de entrada do cluster. Todos os comandos (kubectl, dashboard, automações) passam por aqui. |
| **etcd**               | Banco de dados chave-valor. Armazena o estado do cluster de forma distribuída.                   |
| **Controller Manager** | Detecta mudanças e garante que o cluster atenda o estado desejado.                               |
| **Scheduler**          | Decide em qual nó os contêineres (pods) serão executados.                                        |

## Nó Trabalhador (Worker Node)

Onde os **contêineres realmente rodam**.

### Componentes principais

| Componente            | Função                                                                             |
| --------------------- | ---------------------------------------------------------------------------------- |
| **Container Runtime** | Software responsável por rodar os contêineres. Ex.: Docker, containerd, CRI-O.     |
| **Kubelet**           | Agente que comunica o nó com o mestre. Garante que os contêineres estejam rodando. |
| **Kube Proxy**        | Gerencia a rede dos contêineres, roteamento e balanceamento de carga.              |

## kubectl - Linha de Comando do Kubernetes

Ferramenta para interagir com o cluster.

### Comandos básicos

```bash
# Ver informações do cluster
kubectl cluster-info

# Listar os nós do cluster
kubectl get nodes

# Criar um pod simples (teste)
kubectl run nginx --image=nginx

# Observar os pods rodando
kubectl get pods
```

> **Dica:** Todos os comandos interagem primeiro com o **API Server**, que distribui as ações para os outros componentes.

## Observações Importantes

- O etcd é crítico! Se ele falhar, o cluster perde o estado atual
- O Scheduler escolhe os nós baseado em critérios como:
  - Capacidade de CPU, memória
- O Controller Manager executa diferentes tipos de controladores:
  - Node Controller (monitora nós)
  - Replication Controller
  - Endpoints Controller
