---
date: 2025-10-03
author: Guilherme Rossi Kirsten
tags: [Kubernetes, Deployment, Rolling Updates, Rollback, CI/CD]
---

# Kubernetes Deployment

Deployment é um objeto de alto nível no Kubernetes usado para gerenciar atualizações, rollbacks, escala e controle de estado dos seus aplicativos de forma declarativa.

## O que é um Deployment no Kubernetes?

- É um objeto de alto nível no Kubernetes, usado para gerenciar **atualizações**, **rollbacks**, **escala** e **controle de estado** dos seus aplicativos
- Facilita implantar múltiplas instâncias de um aplicativo de forma confiável

## Por que usar Deployments?

### Escalabilidade

Executar várias instâncias (pods) de um aplicativo facilmente.

### Atualizações Contínuas (Rolling Updates)

Atualizar versões do app sem interrupção, evitando que todos os pods sejam atualizados ao mesmo tempo.

### Rollback

Reverter rapidamente para uma versão anterior se houver falhas na atualização.

### Pausar e Retomar

Fazer várias alterações (versão, recursos, escala) e aplicar todas juntas após revisar.

### Gestão de Estado

O Deployment garante que o número desejado de pods esteja sempre ativo.

## Como funciona a hierarquia?

**Deployment ➝ ReplicaSet ➝ Pods**

- O Deployment cria e gerencia um ReplicaSet
- O ReplicaSet mantém o número correto de pods rodando

## Criando um Deployment

Criamos um arquivo YAML de definição semelhante ao ReplicaSet, com a diferença no campo `kind: Deployment`.

### Estrutura básica de um Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
	name: meu-app
	type: front-end
spec:
	replicas: 3
	selector:
		matchLabels:
			type: front-end
	template:
		metadata:
			name: myapp-pod
			labels:
				app: myapp
				type: front-end
			spec:
				containers:
					- name: meu-app-container
					  image: nginx
```

## Comandos úteis no Deployment

### Criar o Deployment

```bash
kubectl create -f deployment.yaml
```

### Verificar os Deployments

```bash
kubectl get deployments
```

### Verificar ReplicaSets

```bash
kubectl get rs
```

## Rollouts e Revisões

### Rollout

Processo de atualizar uma aplicação para uma nova versão.

### Revisões

Cada mudança em um Deployment cria uma **revisão**:

- **Revisão 1:** Primeira criação do Deployment
- **Revisão 2:** Após atualizar a imagem ou configuração

Permite reverter rapidamente para qualquer versão anterior.

## Estratégias de Atualização

### Recreate (Recriação)

Todos os pods são destruídos e recriados com a nova versão ao mesmo tempo. Causa downtime.

### Rolling Update (Padrão)

Os pods são atualizados gradualmente, mantendo a aplicação disponível durante o processo.

## Exemplo de Definição YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    tier: frontend
    app: nginx
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
