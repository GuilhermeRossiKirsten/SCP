---
date: 2025-07-11
author: Guilherme Rossi Kirsten
tags: [Kubernetes, Instalação, Minikube, Kubectl, Setup]
---

# Instalação e Configuração do Kubernetes

Guia completo para instalar e configurar um ambiente Kubernetes local usando Minikube e kubectl.

## Instalar o kubectl

Ferramenta de linha de comando para interagir com clusters Kubernetes.

Link de instalação: [https://kubernetes.io/pt-br/docs/tasks/tools/#kubectl](https://kubernetes.io/pt-br/docs/tasks/tools/#kubectl)

### Verificar instalação

```bash
kubectl version --client
```

## Minikube / Kind

- Permite que você execute o Kubernetes no seu computador local
- Cluster Kubernetes local tudo-em-um ou com vários nós no seu computador pessoal (incluindo PCs Windows, macOS e Linux)
- Ideal para experimentar o Kubernetes ou para o trabalho de desenvolvimento diário

### Verificar instalação

```bash
minikube version
```

## Iniciar o Cluster Minikube

### Usando Docker como driver

```bash
minikube start --driver=docker
```

O Minikube baixa as imagens necessárias, cria uma VM e configura o Kubernetes local.

## Verificar o Status

```bash
minikube status
```

## Testando o Cluster

### Verificar nós do cluster

```bash
kubectl get nodes
```

Deve aparecer algo como:

```bash
NAME       STATUS   ROLES                  AGE   VERSION
minikube   Ready    control-plane,master   Xs   vX.XX.X
```

### Criar uma aplicação de teste

```bash
kubectl create deployment hello-nginx --image=nginx
```

### Verificar a implantação

```bash
kubectl get all
```

### Expor como serviço

```bash
kubectl expose deployment hello-nginx --type=LoadBalancer --port=80
```

### Obter URL de acesso

```bash
minikube service hello-minikube --url
```

Acesse no navegador para verificar se está funcionando.

## Limpando o Cluster

### Deletar serviço

```bash
kubectl delete service hello-minikube
```

### Deletar deployment

```bash
kubectl delete deployment hello-minikube
```
