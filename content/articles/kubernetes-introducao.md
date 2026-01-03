---
date: 2025-02-14
author: Guilherme Rossi Kirsten
tags: [Kubernetes, DevOps, Containers, Orquestração]
---

# Kubernetes: Introdução e Conceitos Fundamentais

Kubernetes (K8s) é um produto Open Source utilizado para automatizar a implantação, o dimensionamento e o gerenciamento de aplicativos em contêiner.

## O que é Kubernetes?

Kubernetes é uma plataforma de **orquestração de contêineres** que gerencia, escala e automatiza a implantação de aplicações containerizadas.

**Kubertenes** (K8s) é um produto Open Source utilizado para automatizar a implantação, o dimensionamento e o gerenciamento de aplicativos em contêiner.

## Características Principais

- Kubernetes é disponibilizado atravéz de um conjunto de APIs
- API utilizando o CLI: **kubectl**
- Tudo é baseado em estados, configuramos o estado de cada objeto

## Requisitos

Para trabalhar com Kubernetes localmente, você precisa:

### Kind

- Cria ambiente de execução local do kubernetes
- Link: [https://kind.sigs.k8s.io/](https://kind.sigs.k8s.io/)

### Kubectl

- Interface para realizar as operacoes do kubernetes
- Link: [https://kubernetes.io/](https://kubernetes.io/)

### Docker

- Gerenciador dos containers
- Link: [https://docs.docker.com/](https://docs.docker.com/)

## Conceitos Fundamentais

### Cluster

Conjunto de máquinas (Nodes) que trabalham juntas, formado por:

- **Nó Mestre (Control Plane)**
- **Nós de Trabalho (Worker Nodes)**

Cada máquina possui uma quantidade de vCPU e Memória.

### Pods

Pods - Unidade que contém os containers provisionados, representa os processos rodando no cluster.

## Comandos Básicos

### Criando um Cluster

Cria um cluster de kubernetes (apenas 1 nó):

```bash
kind create cluster
```

### Informações do Cluster

Mostra em qual contexto (cluster) estamos, troca o ambiente de execução do kubernetes:

```bash
kubectl cluster-info --context kind-kind
```

Saída esperada:

```bash
Kubernetes control plane is running at https://127.0.0.1:53791
CoreDNS is running at https://127.0.0.1:53791/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

### Listando Nodes

Lista os nodes do cluster de kubernetes:

```bash
kubectl get nodes
```

### Gerenciando Clusters

Lista os clusters:

```bash
kind get clusters
```

```bash
kubectl config get-clusters
```

Troca o contexto (cluster):

```bash
kubectl config use-context kind-kube
```

## Criando Cluster com Múltiplos Nodes

Cria um cluster com configuração customizada:

```bash
kind create cluster --config .\k8s\kind.yaml
```

Exemplo de arquivo de configuração:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4

nodes:
  - role: control-plane
  - role: worker
  - role: worker
  - role: worker
  - role: worker
```

## Componentes do Kubernetes

### Kubernetes Master

- Kube-apiserver
- Kube-controller-manager
- Kube-scheduler

### Outros Nodes

- Kubelet
- Kubeproxy
