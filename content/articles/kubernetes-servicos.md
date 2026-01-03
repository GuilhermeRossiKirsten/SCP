---
date: 2025-11-19
author: Guilherme Rossi Kirsten
tags: [Kubernetes, Services, Networking, ClusterIP, NodePort, LoadBalancer]
---

# Serviços e Networking no Kubernetes

Serviços são objetos que expõem um ou mais Pods, permitindo a comunicação interna ou externa, garantindo estabilidade mesmo quando Pods são reiniciados ou substituídos.

## O que são Serviços no Kubernetes?

- Serviços são objetos que expõem um ou mais **Pods**, permitindo a comunicação interna ou externa
- Eles garantem que, mesmo que os Pods sejam reiniciados ou substituídos, a comunicação continue funcionando através de um **endereço IP estável e nome DNS estável**

## Objetivo dos Serviços

- Permitir que diferentes componentes (front-end, back-end, banco de dados, APIs) se comuniquem
- Expor o aplicativo para acesso externo (usuários, navegadores, clientes externos)
- Realizar balanceamento de carga automático entre múltiplos Pods

## Tipos de Serviços no Kubernetes

| Tipo             | Descrição                                                                                | Acesso                     |
| ---------------- | ---------------------------------------------------------------------------------------- | -------------------------- |
| **ClusterIP**    | Padrão. Exponibiliza o serviço apenas **internamente no cluster**.                       | Interno                    |
| **NodePort**     | Exponibiliza o serviço em uma porta de cada **nó** do cluster.                           | Externo (IP do nó + porta) |
| **LoadBalancer** | Cria um **balanceador de carga externo** em provedores de nuvem (AWS, Azure, GCP, etc.). | Externo (IP público)       |

## NodePort

- Permite acessar o serviço externamente via: `http://<NodeIP>:<NodePort>`
- A faixa padrão de portas NodePort: **30000-32767**

### Exemplo de Arquivo YAML para NodePort

```yaml
apiVersion: v1
kind: Service
metadata:
  name: meu-servico-nodeport
spec:
  type: NodePort
  selector:
    app: meu-app
  ports:
    - port: 80 # Porta interna do serviço
      targetPort: 80 # Porta onde o container está escutando
      nodePort: 30080 # Porta exposta no nó
```

## Portas no Serviço

| Termo          | Descrição                                                    |
| -------------- | ------------------------------------------------------------ |
| **targetPort** | Porta do **container/pod** onde a aplicação escuta (ex.: 80) |
| **port**       | Porta interna do **serviço dentro do cluster**               |
| **nodePort**   | Porta exposta no **nó do cluster** para acesso externo       |

## ClusterIP

### O que é um ClusterIP no Kubernetes?

Um aplicativo web full-stack geralmente é composto por múltiplos componentes:

- **Frontend Web**
- **Backend (APIs)**
- **Cache (ex.: Redis)**
- **Banco de dados (ex.: MySQL)**

Esses componentes precisam se comunicar entre si, porém os **Pods** possuem IPs **dinâmicos**, que mudam sempre que eles são reiniciados ou recriados. Portanto, não é viável conectar diretamente usando os IPs dos Pods.

### Como resolver esse problema?

#### ClusterIP

- Cria um IP virtual e um DNS interno dentro do cluster
- Permite que os Pods se comuniquem entre si de forma estável, mesmo que seus IPs mudem
- Não é acessível de fora do cluster (somente interno)

### Exemplo de YAML de um Service ClusterIP

```yaml
apiVersion: v1
kind: Service
metadata:
  name: image-processing
  labels:
    app: myapp
spec:
  type: ClusterIP
  selector:
    tier: backend
  ports:
    - port: 80
      targetPort: 80
```
