---
date: 2025-01-25
author: Guilherme Rossi Kirsten
tags: [Docker, Containers, DevOps, Virtualização]
---

# Introdução aos Containers e Docker

Um container é uma unidade padronizada de software que empacota o código e todas as suas dependências, permitindo que uma aplicação seja executada de forma rápida e consistente em qualquer ambiente.

## O que são Containers

Um container é uma unidade padronizada de software que empacota o código e todas as suas dependências, permitindo que uma aplicação seja executada de forma rápida e consistente em qualquer ambiente. Isso significa que, independentemente do sistema operacional ou das configurações específicas do host, o container fornecerá um ambiente isolado e consistente para a aplicação.

## Principais Características dos Containers

- **Imutabilidade**: Containers são construídos a partir de imagens que são essencialmente snapshots imutáveis. Isso garante que o ambiente de execução seja o mesmo em qualquer lugar que o container seja implantado.
- **Isolamento de Processos e Recursos Computacionais**: Cada container opera em um espaço de usuário isolado, com seu próprio sistema de arquivos, rede e recursos de processamento.
- **Leveza**: Ao contrário das máquinas virtuais, os containers são executados como processos no sistema operacional do host, sem a necessidade de um sistema operacional completo para cada instância.
- **Utilização dos Recursos do Kernel do SO**: Containers compartilham o kernel do sistema operacional do host.
- **Ilusão de SO Próprio**: Através de tecnologias como namespaces e cgroups, o container é "enganado" para acreditar que possui seu próprio sistema operacional.
- **Visibilidade Limitada de Processos**: Um container só pode ver e interagir com processos dentro do seu próprio espaço.
- **Inicialização Rápida**: Containers podem ser iniciados e parados quase instantaneamente.
- **Utilização de Imagens Imutáveis**: Containers são criados a partir de imagens imutáveis, garantindo consistência entre ambientes.
- **Predominância no Linux**: A maioria das tecnologias de containerização foi desenvolvida para o Linux.
- **"Na Minha Máquina Funciona"**: Containers mitigam discrepâncias entre ambientes de desenvolvimento e produção.

## Containers vs. Máquinas Virtuais

### Máquinas Virtuais (VMs)

- **Sistema Operacional Completo**: Cada VM executa um SO completo.
- **Overhead Maior**: Consomem mais recursos de memória e CPU.
- **Tempo de Inicialização Mais Longo**: Pode levar minutos.
- **Isolamento Forte**: Alto nível de isolamento entre VMs.

### Containers

- **Compartilhamento do Kernel do Host**: Isolam apenas o aplicativo e suas dependências.
- **Leveza e Eficiência**: Sem a necessidade de um SO completo.
- **Inicialização Instantânea**: Milissegundos.
- **Isolamento de Aplicativos**: Utilizam namespaces e cgroups.
- **Alta Densidade**: Permitem execução de muitos containers em um host.

## Docker como Container Runtime

### História do Docker

- **Origem**: Criado em 2013 pela dotCloud.
- **Open Source**: Tornou-se código aberto e popularizou a containerização.
- **Evolução para Docker Inc.**: Focada no desenvolvimento e suporte ao Docker.

### Docker Engine, Docker CE e Docker Desktop

- **Docker Engine**: Responsável por criar, gerenciar e executar containers.
- **Docker CE (Community Edition)**: Versão gratuita e open source.
- **Docker Desktop**: Ambiente completo para desenvolvimento Docker em macOS e Windows.

### Diferença entre Docker CE/Engine e Docker Desktop

- **Docker CE/Engine**: Tecnologia base para containers.
- **Docker Desktop**: Interface integrada para desenvolvimento.

## Funcionamento do Docker

- **Utilização de Recursos do Linux**: Usa namespaces e cgroups.
- **Ferramenta 360**: Gerencia containers, redes, volumes e imagens.
- **Arquitetura Cliente-Servidor**:
  - **Daemon Docker**: Gerencia containers, imagens, redes e volumes.
  - **Cliente Docker**: CLI para interação com o daemon.
- **Ponto Único de Falha (SPoF)**: O daemon Docker gerencia tudo; se falhar, todos os containers podem ser afetados.

### Root vs. Rootless

- **Modo Root**: Requer privilégios de root.
- **Modo Rootless**: Permite execução sem acesso root para maior segurança.

## Observações sobre a Docker Inc.

- **Contribuição para a Comunidade**: Popularizou os containers e contribui com projetos open source.
- **Modelos de Negócio**: Oferece versões gratuitas e empresariais.
- **Ecossistema Rico**: Mantém o Docker Hub e outras ferramentas complementares.

## Open Container Initiative (OCI)

A **Open Container Initiative (OCI)** é um projeto fundado em 2015 pela Docker Inc. e outras empresas para criar padrões abertos para containers e runtimes.

### Principais Objetivos da OCI

- **Estabelecer Padrões**: Criar especificações padronizadas para containers.
- **Interoperabilidade**: Permitir execução de containers em diferentes plataformas.
- **Neutralidade**: Garantir que padrões sejam gerenciados pela comunidade.

### Importância da OCI

- **Evitar Lock-in**: Desenvolvedores não ficam presos a uma única ferramenta.
- **Facilitar a Inovação**: Permite que novas ferramentas sejam desenvolvidas sobre padrões comuns.
- **Adoção Ampla**: Docker e Kubernetes seguem os padrões OCI, promovendo compatibilidade.
