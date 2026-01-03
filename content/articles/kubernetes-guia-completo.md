---
date: 2026-01-03
author: Guilherme Rossi Kirsten
tags: [Kubernetes, DevOps, Containers, Cloud, Orquestração]
---

# Kubernetes: Orquestração de Containers em Produção

Kubernetes se tornou o padrão de facto para orquestração de containers. Neste guia completo, exploramos desde conceitos básicos até práticas avançadas para executar aplicações em escala.

## O Que é Kubernetes?

Kubernetes (K8s) é uma plataforma open-source para automação de deploy, escalonamento e gerenciamento de aplicações containerizadas. Originalmente desenvolvido pelo Google e agora mantido pela CNCF (Cloud Native Computing Foundation).

### Por Que Usar Kubernetes?

**Principais benefícios:**

- **Orquestração Automatizada** - Deploy e gerenciamento de containers simplificado
- **Self-Healing** - Reinicia containers que falham, substitui e reagenda containers
- **Escalonamento Horizontal** - Escala sua aplicação para cima ou para baixo com um comando
- **Service Discovery e Load Balancing** - Kubernetes pode expor um container usando DNS ou IP próprio
- **Rollouts e Rollbacks Automáticos** - Deploy de novas versões sem downtime
- **Gerenciamento de Configuração** - Armazena e gerencia informações sensíveis

## Arquitetura do Kubernetes

### Control Plane

O Control Plane gerencia o cluster Kubernetes. Componentes principais:

#### API Server

Ponto de entrada para todas as operações REST. Valida e processa requisições.

```bash
# Verificar status do API Server
kubectl cluster-info

# Acessar API diretamente
kubectl proxy --port=8080
curl http://localhost:8080/api/v1/namespaces/default/pods
```

#### etcd

Banco de dados distribuído que armazena todo o estado do cluster.

#### Scheduler

Decide em qual Node um Pod deve ser executado baseado em recursos disponíveis.

#### Controller Manager

Executa processos de controle em background (ReplicaSet, Deployment, etc).

### Worker Nodes

Nodes são máquinas (físicas ou virtuais) que executam as aplicações.

#### Kubelet

Agente que roda em cada Node e garante que os containers estejam rodando nos Pods.

#### Kube-proxy

Mantém regras de rede nos Nodes, permitindo comunicação entre Pods.

#### Container Runtime

Software responsável por executar containers (Docker, containerd, CRI-O).

## Conceitos Fundamentais

### Pods

Pod é a menor unidade computacional no Kubernetes. Pode conter um ou mais containers.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
    - name: nginx
      image: nginx:1.21
      ports:
        - containerPort: 80
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "500m"
```

**Criar e gerenciar o Pod:**

```bash
# Criar Pod
kubectl apply -f nginx-pod.yaml

# Listar Pods
kubectl get pods

# Ver detalhes
kubectl describe pod nginx-pod

# Ver logs
kubectl logs nginx-pod

# Executar comando dentro do Pod
kubectl exec -it nginx-pod -- /bin/bash

# Deletar Pod
kubectl delete pod nginx-pod
```

### Deployments

Deployments fornecem atualizações declarativas para Pods e ReplicaSets.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.21
          ports:
            - containerPort: 80
          livenessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 5
```

**Operações com Deployments:**

```bash
# Criar Deployment
kubectl apply -f nginx-deployment.yaml

# Verificar status do rollout
kubectl rollout status deployment/nginx-deployment

# Ver histórico de revisões
kubectl rollout history deployment/nginx-deployment

# Atualizar imagem
kubectl set image deployment/nginx-deployment nginx=nginx:1.22

# Fazer rollback
kubectl rollout undo deployment/nginx-deployment

# Escalar manualmente
kubectl scale deployment/nginx-deployment --replicas=5

# Auto-scaling
kubectl autoscale deployment nginx-deployment --min=2 --max=10 --cpu-percent=80
```

### Services

Services expõem Pods para rede, criando um endpoint estável.

#### ClusterIP (padrão)

Expõe o Service apenas internamente no cluster.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

#### NodePort

Expõe o Service em uma porta específica de cada Node.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-nodeport
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
  type: NodePort
```

#### LoadBalancer

Cria um load balancer externo (em cloud providers).

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-loadbalancer
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

**Gerenciar Services:**

```bash
# Listar services
kubectl get services

# Ver detalhes
kubectl describe service nginx-service

# Expor deployment como service
kubectl expose deployment nginx-deployment --type=LoadBalancer --port=80
```

### ConfigMaps e Secrets

#### ConfigMaps

Armazenam dados de configuração em pares chave-valor.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgresql://db:5432/myapp"
  log_level: "info"
  max_connections: "100"
```

**Usar ConfigMap no Pod:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
    - name: app
      image: myapp:latest
      env:
        - name: DATABASE_URL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: database_url
      volumeMounts:
        - name: config
          mountPath: /etc/config
  volumes:
    - name: config
      configMap:
        name: app-config
```

#### Secrets

Armazenam informações sensíveis de forma segura.

```bash
# Criar Secret a partir de literais
kubectl create secret generic db-credentials \
  --from-literal=username=admin \
  --from-literal=password=secretpassword

# Criar Secret a partir de arquivo
kubectl create secret generic tls-cert \
  --from-file=tls.crt=./cert.crt \
  --from-file=tls.key=./cert.key
```

**YAML do Secret:**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4= # base64 encoded
  password: c2VjcmV0cGFzc3dvcmQ= # base64 encoded
```

**Usar Secret:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
    - name: app
      image: myapp:latest
      env:
        - name: DB_USERNAME
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: username
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
```

### Persistent Volumes

#### PersistentVolume (PV)

Recurso de armazenamento no cluster.

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: postgres-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: standard
  hostPath:
    path: /data/postgres
```

#### PersistentVolumeClaim (PVC)

Requisição de armazenamento por um usuário.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard
```

**Usar PVC no Pod:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres-pod
spec:
  containers:
    - name: postgres
      image: postgres:14
      volumeMounts:
        - mountPath: /var/lib/postgresql/data
          name: postgres-storage
  volumes:
    - name: postgres-storage
      persistentVolumeClaim:
        claimName: postgres-pvc
```

## Namespace e Organização

Namespaces fornecem isolamento lógico de recursos.

```bash
# Criar namespace
kubectl create namespace development
kubectl create namespace production

# Listar namespaces
kubectl get namespaces

# Criar recurso em namespace específico
kubectl apply -f deployment.yaml -n development

# Configurar namespace padrão
kubectl config set-context --current --namespace=development
```

**Definir namespace no YAML:**

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: development
  labels:
    env: dev
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
  namespace: development
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: app
          image: myapp:latest
```

## Ingress Controllers

Ingress gerencia acesso externo aos services no cluster, tipicamente HTTP/HTTPS.

### Instalação do NGINX Ingress Controller

```bash
# Usando Helm
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install nginx-ingress ingress-nginx/ingress-nginx

# Ou usando manifesto
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```

### Configuração de Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - myapp.example.com
      secretName: myapp-tls
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: myapp-service
                port:
                  number: 80
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 8080
```

## Monitoramento e Observabilidade

### Health Checks

#### Liveness Probe

Verifica se o container está vivo.

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 15
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 3
```

#### Readiness Probe

Verifica se o container está pronto para receber tráfego.

```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  timeoutSeconds: 2
  successThreshold: 1
```

#### Startup Probe

Para containers que demoram para iniciar.

```yaml
startupProbe:
  httpGet:
    path: /startup
    port: 8080
  failureThreshold: 30
  periodSeconds: 10
```

### Logs

```bash
# Ver logs de um Pod
kubectl logs pod-name

# Logs de container específico
kubectl logs pod-name -c container-name

# Seguir logs em tempo real
kubectl logs -f pod-name

# Logs de todos os Pods de um Deployment
kubectl logs -l app=nginx --all-containers=true

# Logs anteriores (container que crashou)
kubectl logs pod-name --previous
```

### Metrics Server

```bash
# Instalar Metrics Server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Ver métricas de Nodes
kubectl top nodes

# Ver métricas de Pods
kubectl top pods

# Ver métricas de um namespace específico
kubectl top pods -n production
```

## Boas Práticas

### 1. Use Namespaces

Organize recursos por ambiente ou equipe.

```bash
kubectl create namespace production
kubectl create namespace staging
kubectl create namespace development
```

### 2. Defina Resource Limits

Sempre especifique requests e limits.

```yaml
resources:
  requests:
    memory: "64Mi"
    cpu: "250m"
  limits:
    memory: "128Mi"
    cpu: "500m"
```

### 3. Use Health Checks

Implemente liveness e readiness probes em todos os containers.

### 4. Não Use :latest

Sempre especifique versões exatas das imagens.

```yaml
# ❌ Ruim
image: nginx:latest

# ✅ Bom
image: nginx:1.21.6
```

### 5. Configure Network Policies

Controle o tráfego entre Pods.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
```

### 6. Use RBAC

Implemente controle de acesso baseado em funções.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: development
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: development
subjects:
  - kind: User
    name: developer
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### 7. Backup e Disaster Recovery

Use ferramentas como Velero para backup do cluster.

```bash
# Instalar Velero
velero install --provider aws --bucket my-backup-bucket

# Fazer backup de namespace
velero backup create dev-backup --include-namespaces development

# Restaurar backup
velero restore create --from-backup dev-backup
```

## Ferramentas Essenciais

### kubectl

CLI principal para interagir com Kubernetes.

```bash
# Contexto e configuração
kubectl config view
kubectl config use-context production
kubectl config get-contexts

# Recursos
kubectl get all -A
kubectl describe pod pod-name
kubectl edit deployment deployment-name

# Debugging
kubectl exec -it pod-name -- /bin/bash
kubectl port-forward pod-name 8080:80
kubectl cp pod-name:/path/to/file ./local-file
```

### Helm

Gerenciador de pacotes para Kubernetes.

```bash
# Adicionar repositório
helm repo add stable https://charts.helm.sh/stable

# Instalar chart
helm install my-release stable/postgresql

# Atualizar release
helm upgrade my-release stable/postgresql --set postgresqlPassword=newpassword

# Listar releases
helm list

# Desinstalar
helm uninstall my-release
```

### k9s

Interface TUI para gerenciar clusters Kubernetes.

```bash
# Instalar
brew install k9s

# Executar
k9s
```

### Lens

IDE desktop para Kubernetes.

**Features:**

- Dashboard visual
- Logs em tempo real
- Terminal integrado
- Gerenciamento de recursos
- Multi-cluster support

## Conclusão

Kubernetes é uma plataforma poderosa para orquestração de containers em produção. Dominar seus conceitos e práticas é essencial para qualquer desenvolvedor trabalhando com infraestrutura moderna.

**Próximos Passos:**

1. Configure um cluster local com Minikube ou Kind
2. Deploy uma aplicação completa (frontend, backend, database)
3. Implemente CI/CD com GitOps (ArgoCD, Flux)
4. Estude service mesh (Istio, Linkerd)
5. Aprenda sobre Operators e Custom Resource Definitions

**Recursos Adicionais:**

- [Documentação Oficial do Kubernetes](https://kubernetes.io/docs/)
- [Kubernetes Patterns](https://k8spatterns.io/)
- [CNCF Landscape](https://landscape.cncf.io/)
- [Kubernetes The Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way)

> **Dica:** Comece simples e evolua gradualmente. Kubernetes tem uma curva de aprendizado, mas os benefícios em escala e confiabilidade valem o investimento.

---

**Happy Orchestrating!** ☸️
