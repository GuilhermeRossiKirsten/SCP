---
date: 2025-03-27
author: Guilherme Rossi Kirsten
tags: [YAML, Kubernetes, Docker Compose, Configuração]
---

# YAML no Kubernetes

YAML é o formato padrão usado para definir e configurar recursos no Kubernetes. Este guia apresenta os conceitos fundamentais da sintaxe YAML.

## O que é YAML?

- YAML significa **"YAML Ain't Markup Language"**
- É um formato de serialização de dados
- Usado principalmente para arquivos de configuração

## Estruturas Básicas

### Chave-Valor

```yaml
fruta: maçã
vegetal: cenoura
liquido: água
carne: frango
```

### Lista (Array)

```yaml
frutas:
	- maçã
	- banana
	- uva
```

- Ordem dos itens **importa**

### Dicionário (Objeto)

```yaml
banana:
	calorias: 105
	gordura: 0.3
	carboidratos: 27
```

- Agrupa várias propriedades de um único item

### Lista de Dicionários

```yaml
carros:
	- modelo:
		nome: Civic
		ano: 2020
	  cor: preto
	  preco: 80000
	- modelo:
		nome: Corolla
		ano: 2021
	  cor: branco
	  preco: 90000
```

- Representa vários objetos com propriedades completas

## Regras Importantes

### Indentação

- YAML é **sensível à indentação**
- Use **espaços**, **nunca TAB**
- A indentação define hierarquia dos dados

### Dicionário

- Coleção **não ordenada**
- A ordem das chaves não interfere nos dados

### Lista (Array)

- Coleção **ordenada**
- A ordem dos itens **é importante**
