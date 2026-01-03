---
date: 2026-01-03
author: Guilherme Rossi Kirsten
tags: [Git, Controle de Versão, GitHub, GitLab, DevOps, Versionamento]
---

# Git: Do Básico ao Avançado - Guia Completo

Git é o sistema de controle de versão distribuído mais popular do mundo, criado por Linus Torvalds em 2005. Este guia completo cobre desde os conceitos fundamentais até técnicas avançadas de versionamento de código.

## O que é Git?

Git é um sistema de controle de versão distribuído (DVCS - Distributed Version Control System) que permite:

- **Rastrear mudanças** no código ao longo do tempo
- **Colaborar** com múltiplos desenvolvedores simultaneamente
- **Reverter** para versões anteriores quando necessário
- **Criar branches** para desenvolvimento paralelo
- **Manter histórico** completo de todas as alterações

### Git vs GitHub vs GitLab

- **Git**: Sistema de controle de versão (ferramenta local)
- **GitHub**: Plataforma de hospedagem de repositórios Git (cloud)
- **GitLab**: Plataforma alternativa ao GitHub com CI/CD integrado
- **Bitbucket**: Outra alternativa, popular em empresas

## Conceitos Fundamentais

### Repositório (Repository)

Um repositório é um diretório que contém todos os arquivos do projeto e o histórico completo de versões.

- **Repositório Local**: Cópia no seu computador
- **Repositório Remoto**: Cópia em servidor (GitHub, GitLab, etc.)

### Commit

Um commit é um "snapshot" (instantâneo) do seu código em um determinado momento. Cada commit possui:

- **Hash único**: Identificador SHA-1 (ex: `a3f2b9c...`)
- **Mensagem**: Descrição das mudanças
- **Autor**: Quem fez o commit
- **Data/Hora**: Quando foi criado
- **Ponteiro para commit anterior**: Histórico

### Working Directory, Staging Area e Repository

```
Working Directory  →  Staging Area  →  Repository
(arquivos locais)     (git add)        (git commit)
```

- **Working Directory**: Seus arquivos de trabalho atuais
- **Staging Area (Index)**: Área intermediária onde você prepara o commit
- **Repository (.git)**: Histórico permanente de commits

### Branch (Ramificação)

Branches são linhas independentes de desenvolvimento. Permitem trabalhar em features sem afetar o código principal.

```
main/master (branch principal)
    |
    |--- feature/nova-funcionalidade
    |--- bugfix/corrigir-erro
    |--- hotfix/urgente
```

## Instalação e Configuração Inicial

### Instalação

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install git
```

**macOS:**

```bash
brew install git
```

**Windows:**
Baixe o instalador em: https://git-scm.com/download/win

### Verificar instalação

```bash
git --version
# Saída: git version 2.x.x
```

### Configuração Global

Configure seu nome e email (aparecerão em todos os commits):

```bash
# Nome de usuário
git config --global user.name "Seu Nome"

# Email
git config --global user.email "seu.email@exemplo.com"

# Editor padrão (opcional)
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "vim"          # Vim
git config --global core.editor "nano"         # Nano

# Configurar branch padrão como "main"
git config --global init.defaultBranch main

# Ver todas as configurações
git config --list

# Ver configuração específica
git config user.name
```

### Níveis de Configuração

```bash
# --system: Afeta todos os usuários do sistema
git config --system user.name "Nome"

# --global: Afeta todos os repositórios do usuário
git config --global user.email "email@exemplo.com"

# --local: Apenas o repositório atual (padrão)
git config user.name "Nome Projeto"
```

## Comandos Básicos

### Criar um Novo Repositório

**Inicializar repositório local:**

```bash
# Criar diretório do projeto
mkdir meu-projeto
cd meu-projeto

# Inicializar Git
git init

# Verificar status
git status
```

**Clonar repositório existente:**

```bash
# Clonar via HTTPS
git clone https://github.com/usuario/repositorio.git

# Clonar via SSH
git clone git@github.com:usuario/repositorio.git

# Clonar com nome diferente
git clone https://github.com/usuario/repo.git novo-nome

# Clonar branch específica
git clone -b develop https://github.com/usuario/repo.git
```

### Ciclo Básico de Trabalho

**1. Verificar status:**

```bash
git status

# Versão curta
git status -s
```

**2. Adicionar arquivos (Staging):**

```bash
# Adicionar arquivo específico
git add arquivo.txt

# Adicionar múltiplos arquivos
git add arquivo1.txt arquivo2.js

# Adicionar todos os arquivos modificados
git add .
git add -A
git add --all

# Adicionar por padrão
git add *.js          # Todos os arquivos .js
git add src/          # Toda a pasta src/

# Adicionar interativamente
git add -p            # Permite escolher partes do arquivo
```

**3. Fazer commit:**

```bash
# Commit com mensagem
git commit -m "Adiciona funcionalidade X"

# Commit com mensagem detalhada (abre editor)
git commit

# Adicionar e commitar arquivos já rastreados
git commit -am "Mensagem"

# Modificar último commit (antes do push)
git commit --amend -m "Nova mensagem"

# Adicionar arquivos ao último commit
git add arquivo-esquecido.txt
git commit --amend --no-edit
```

**4. Ver histórico:**

```bash
# Log completo
git log

# Log resumido (uma linha por commit)
git log --oneline

# Log com gráfico de branches
git log --oneline --graph --all

# Log com diferenças
git log -p

# Log dos últimos N commits
git log -5

# Log de um autor específico
git log --author="Nome do Autor"

# Log por período
git log --since="2 weeks ago"
git log --after="2024-01-01" --before="2024-12-31"

# Log de arquivo específico
git log arquivo.txt

# Log formatado personalizado
git log --pretty=format:"%h - %an, %ar : %s"
```

### Visualizar Mudanças

```bash
# Ver mudanças não staged
git diff

# Ver mudanças staged
git diff --staged
git diff --cached

# Diferença entre branches
git diff branch1..branch2

# Diferença de arquivo específico
git diff arquivo.txt

# Estatísticas das mudanças
git diff --stat

# Ver mudanças de um commit específico
git show a3f2b9c
git show HEAD
git show HEAD~2  # 2 commits atrás
```

### Desfazer Mudanças

```bash
# Descartar mudanças no working directory
git checkout -- arquivo.txt
git restore arquivo.txt  # Comando moderno

# Remover arquivo da staging area (unstage)
git reset HEAD arquivo.txt
git restore --staged arquivo.txt  # Comando moderno

# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Desfazer último commit (descarta mudanças)
git reset --hard HEAD~1

# Reverter commit específico (cria novo commit)
git revert a3f2b9c

# Limpar arquivos não rastreados
git clean -n   # Visualizar o que será removido
git clean -f   # Remover arquivos
git clean -fd  # Remover arquivos e diretórios
```

### Ignorar Arquivos (.gitignore)

Crie um arquivo `.gitignore` na raiz do projeto:

```bash
# Exemplo de .gitignore

# Dependências
node_modules/
vendor/
*.log

# Arquivos de build
dist/
build/
*.o
*.exe

# Arquivos do sistema
.DS_Store
Thumbs.db

# IDEs
.vscode/
.idea/
*.swp

# Arquivos de ambiente
.env
.env.local
config/secrets.yml

# Arquivos temporários
tmp/
*.tmp
*.bak
```

**Comandos úteis para .gitignore:**

```bash
# Parar de rastrear arquivo já commitado
git rm --cached arquivo.txt

# Aplicar .gitignore a arquivos já rastreados
git rm -r --cached .
git add .
git commit -m "Aplica .gitignore"
```

## Trabalhando com Branches

### Conceitos de Branch

Branches permitem desenvolvimento paralelo sem interferir no código principal.

**Convenções de nomenclatura:**

- `main/master`: Branch principal
- `develop`: Branch de desenvolvimento
- `feature/nome-feature`: Novas funcionalidades
- `bugfix/descricao`: Correção de bugs
- `hotfix/urgente`: Correções urgentes em produção
- `release/v1.0.0`: Preparação de releases

### Comandos de Branch

```bash
# Listar branches locais
git branch

# Listar branches remotas
git branch -r

# Listar todas as branches
git branch -a

# Criar nova branch
git branch feature/nova-funcionalidade

# Criar e mudar para nova branch
git checkout -b feature/login
git switch -c feature/login  # Comando moderno

# Mudar de branch
git checkout main
git switch main  # Comando moderno

# Renomear branch atual
git branch -m novo-nome

# Renomear branch específica
git branch -m nome-antigo nome-novo

# Deletar branch local
git branch -d feature/concluida

# Forçar deleção (com mudanças não mergeadas)
git branch -D feature/descartada

# Ver último commit de cada branch
git branch -v

# Ver branches já mergeadas
git branch --merged

# Ver branches não mergeadas
git branch --no-merged
```

### Workflow Típico com Branches

```bash
# 1. Criar branch para nova feature
git checkout -b feature/sistema-login

# 2. Fazer mudanças e commits
git add .
git commit -m "Adiciona formulário de login"
git commit -m "Adiciona validação de campos"

# 3. Voltar para main
git checkout main

# 4. Atualizar main
git pull origin main

# 5. Fazer merge da feature
git merge feature/sistema-login

# 6. Deletar branch da feature
git branch -d feature/sistema-login

# 7. Enviar para remoto
git push origin main
```

## Merge e Resolução de Conflitos

### Tipos de Merge

**1. Fast-Forward Merge:**

Quando não há divergência entre branches:

```bash
# main: A -- B -- C
# feature:         D -- E

git checkout main
git merge feature

# Resultado: A -- B -- C -- D -- E
```

**2. Three-Way Merge:**

Quando há commits em ambas as branches:

```bash
# main:    A -- B -- C -- F
#                   \
# feature:           D -- E

git checkout main
git merge feature

# Resultado cria commit de merge M:
# A -- B -- C -- F -- M
#          \       /
#           D -- E
```

### Comandos de Merge

```bash
# Merge simples
git merge feature/login

# Merge sem fast-forward (sempre cria commit)
git merge --no-ff feature/login

# Merge com mensagem personalizada
git merge -m "Merge feature login" feature/login

# Abortar merge em conflito
git merge --abort

# Ver branches mergeadas em main
git branch --merged main
```

### Resolução de Conflitos

Quando o mesmo arquivo é modificado em ambas as branches:

```bash
# Tentar fazer merge
git merge feature/conflito

# Git indica conflito
# CONFLICT (content): Merge conflict in arquivo.txt
# Automatic merge failed; fix conflicts and then commit the result.

# Ver arquivos em conflito
git status
```

**Arquivo com conflito:**

```javascript
<<<<<<< HEAD
const nome = "Versão Main";
=======
const nome = "Versão Feature";
>>>>>>> feature/conflito
```

**Resolver manualmente:**

1. Abra o arquivo e edite
2. Remova os marcadores (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Escolha qual versão manter ou combine ambas
4. Salve o arquivo

```bash
# Adicionar arquivo resolvido
git add arquivo.txt

# Completar o merge
git commit -m "Resolve conflito entre main e feature"

# Ou usar ferramentas de merge
git mergetool
```

**Ferramentas de merge:**

```bash
# Configurar ferramenta de merge
git config --global merge.tool vimdiff
git config --global merge.tool meld
git config --global merge.tool kdiff3

# Usar ferramenta
git mergetool
```

## Trabalhando com Repositórios Remotos

### Adicionar Remote

```bash
# Ver remotos configurados
git remote
git remote -v

# Adicionar remote
git remote add origin https://github.com/usuario/repo.git

# Adicionar múltiplos remotos
git remote add upstream https://github.com/original/repo.git

# Remover remote
git remote remove origin

# Renomear remote
git remote rename origin novo-nome

# Ver informações do remote
git remote show origin
```

### Push (Enviar)

```bash
# Push para branch remota
git push origin main

# Push primeira vez (set upstream)
git push -u origin main
git push --set-upstream origin main

# Depois basta:
git push

# Push todas as branches
git push --all

# Push tags
git push --tags

# Forçar push (CUIDADO!)
git push --force
git push -f

# Push force mais seguro
git push --force-with-lease

# Deletar branch remota
git push origin --delete feature/antiga
```

### Pull (Baixar)

```bash
# Pull da branch atual
git pull

# Pull de branch específica
git pull origin main

# Pull com rebase
git pull --rebase

# Pull de todos os remotos
git pull --all
```

### Fetch vs Pull

```bash
# Fetch: baixa mudanças mas não integra
git fetch origin

# Ver branches remotas
git branch -r

# Inspecionar mudanças remotas
git log origin/main

# Integrar manualmente após fetch
git merge origin/main

# Pull = Fetch + Merge
git pull origin main
# Equivalente a:
# git fetch origin
# git merge origin/main
```

## Comandos Intermediários

### Stash (Guardar Mudanças)

Salvar mudanças temporariamente sem fazer commit:

```bash
# Guardar mudanças
git stash
git stash save "Descrição do stash"

# Listar stashes
git stash list
# stash@{0}: WIP on main: a3f2b9c Mensagem
# stash@{1}: WIP on feature: b4d3e8f Outra mensagem

# Aplicar último stash
git stash apply

# Aplicar e remover último stash
git stash pop

# Aplicar stash específico
git stash apply stash@{1}

# Ver mudanças no stash
git stash show
git stash show -p  # Com diff

# Deletar stash
git stash drop stash@{0}

# Limpar todos os stashes
git stash clear

# Criar branch a partir do stash
git stash branch nova-branch stash@{0}
```

### Tags (Marcações)

Tags marcam commits importantes (releases, versões):

```bash
# Criar tag leve
git tag v1.0.0

# Criar tag anotada (recomendado)
git tag -a v1.0.0 -m "Versão 1.0.0 - Release Inicial"

# Criar tag em commit específico
git tag -a v0.9.0 a3f2b9c -m "Versão Beta"

# Listar tags
git tag
git tag -l "v1.*"  # Filtrar tags

# Ver informações da tag
git show v1.0.0

# Push de tags
git push origin v1.0.0
git push origin --tags  # Todas as tags

# Deletar tag local
git tag -d v1.0.0

# Deletar tag remota
git push origin --delete v1.0.0

# Checkout de tag
git checkout v1.0.0
```

### Rebase

Rebase reescreve o histórico, movendo commits para nova base:

```bash
# Rebase branch atual na main
git checkout feature/login
git rebase main

# Rebase interativo (últimos 3 commits)
git rebase -i HEAD~3

# Continuar rebase após resolver conflitos
git rebase --continue

# Pular commit problemático
git rebase --skip

# Abortar rebase
git rebase --abort
```

**Rebase Interativo - Opções:**

```
pick a3f2b9c Commit 1      # Manter commit
reword b4d3e8f Commit 2    # Mudar mensagem
edit c5e4f9a Commit 3      # Editar commit
squash d6f5g0b Commit 4    # Juntar com anterior
fixup e7g6h1c Commit 5     # Juntar sem mensagem
drop f8h7i2d Commit 6      # Descartar commit
```

**Merge vs Rebase:**

```bash
# MERGE: Preserva histórico completo
git checkout main
git merge feature
# Cria commit de merge

# REBASE: História linear e limpa
git checkout feature
git rebase main
# Move commits para nova base
```

### Cherry-Pick

Aplicar commit específico em outra branch:

```bash
# Aplicar commit específico
git cherry-pick a3f2b9c

# Cherry-pick múltiplos commits
git cherry-pick a3f2b9c b4d3e8f

# Cherry-pick range de commits
git cherry-pick a3f2b9c..c5e4f9a

# Cherry-pick sem commit automático
git cherry-pick -n a3f2b9c

# Abortar cherry-pick
git cherry-pick --abort
```

## Técnicas Avançadas

### Git Reflog

Reflog rastreia todas as mudanças em HEAD (histórico local):

```bash
# Ver reflog
git reflog

# Ver reflog de branch específica
git reflog show feature/login

# Recuperar commit "perdido"
git reflog
# 3a5c7d1 HEAD@{0}: commit: Último commit
# 2b4d6f8 HEAD@{1}: reset: moving to HEAD~1
# 9e8a3c2 HEAD@{2}: commit: Commit perdido

# Recuperar:
git checkout 9e8a3c2
git branch recuperado 9e8a3c2
```

### Bisect (Busca Binária)

Encontrar commit que introduziu bug:

```bash
# Iniciar bisect
git bisect start

# Marcar commit atual como ruim
git bisect bad

# Marcar commit antigo como bom
git bisect good a3f2b9c

# Git faz checkout de commit no meio
# Testar e marcar como bom ou ruim
git bisect good  # ou git bisect bad

# Git continua até encontrar commit problemático

# Finalizar bisect
git bisect reset
```

### Submódulos (Submodules)

Incluir repositórios dentro de repositórios:

```bash
# Adicionar submódulo
git submodule add https://github.com/usuario/lib.git libs/externa

# Clonar projeto com submódulos
git clone --recursive https://github.com/usuario/projeto.git

# Inicializar submódulos após clone normal
git submodule init
git submodule update

# Atualizar submódulos
git submodule update --remote

# Ver status dos submódulos
git submodule status

# Remover submódulo
git submodule deinit libs/externa
git rm libs/externa
```

### Worktrees

Múltiplas working directories do mesmo repositório:

```bash
# Criar worktree para branch
git worktree add ../projeto-hotfix hotfix/bug-critico

# Listar worktrees
git worktree list

# Remover worktree
git worktree remove ../projeto-hotfix

# Limpar worktrees removidos
git worktree prune
```

### Hooks

Scripts automatizados em eventos Git:

```bash
# Localização dos hooks
cd .git/hooks/

# Hooks comuns:
# pre-commit - Antes de commit
# pre-push - Antes de push
# post-merge - Após merge
# commit-msg - Validar mensagem
```

**Exemplo pre-commit hook:**

```bash
#!/bin/sh
# .git/hooks/pre-commit

# Executar testes
npm test
if [ $? -ne 0 ]; then
    echo "Testes falharam. Commit abortado."
    exit 1
fi

# Executar linter
npm run lint
if [ $? -ne 0 ]; then
    echo "Linter encontrou erros. Commit abortado."
    exit 1
fi
```

### Git Blame

Identificar quem modificou cada linha:

```bash
# Blame completo
git blame arquivo.txt

# Blame com linhas específicas
git blame -L 10,20 arquivo.txt

# Blame ignorando commits de formatação
git blame -w arquivo.txt

# Ver quem deletou linha
git log -S "código deletado" -- arquivo.txt
```

### Git Grep

Buscar em todo o repositório:

```bash
# Buscar texto
git grep "função"

# Buscar em branch específica
git grep "TODO" main

# Buscar com regex
git grep -E "função|metodo"

# Mostrar número de linhas
git grep -n "import"

# Contar ocorrências
git grep -c "class"
```

## Workflows e Boas Práticas

### Git Flow

Modelo de branching popular:

```
main (produção)
  |
develop (desenvolvimento)
  |
  |-- feature/* (novas funcionalidades)
  |-- release/* (preparação de versão)
  |-- hotfix/* (correções urgentes)
```

**Comandos Git Flow:**

```bash
# Instalar git-flow
# Linux: sudo apt install git-flow
# macOS: brew install git-flow

# Inicializar git flow
git flow init

# Criar feature
git flow feature start login
git flow feature finish login

# Criar release
git flow release start 1.0.0
git flow release finish 1.0.0

# Criar hotfix
git flow hotfix start bug-critico
git flow hotfix finish bug-critico
```

### Conventional Commits

Padrão para mensagens de commit:

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé(s) opcional(is)]
```

**Tipos comuns:**

```bash
feat: Adiciona login com Google
fix: Corrige erro de validação no formulário
docs: Atualiza README com instruções
style: Formata código com Prettier
refactor: Refatora serviço de autenticação
test: Adiciona testes para UserController
chore: Atualiza dependências
perf: Melhora performance da query
ci: Configura GitHub Actions
```

**Exemplos:**

```bash
git commit -m "feat: adiciona autenticação JWT"

git commit -m "fix(api): corrige validação de email"

git commit -m "docs: adiciona guia de contribuição

- Adiciona CONTRIBUTING.md
- Atualiza README com seção de desenvolvimento
- Adiciona código de conduta"

git commit -m "feat!: remove suporte ao Node 14

BREAKING CHANGE: A versão mínima do Node.js agora é 16"
```

### Boas Práticas

**Commits:**

- ✅ Faça commits pequenos e frequentes
- ✅ Commits devem ser atômicos (uma mudança lógica)
- ✅ Mensagens claras e descritivas
- ✅ Use tempo verbal imperativo ("Adiciona" não "Adicionado")
- ❌ Não commite código quebrado
- ❌ Não commite arquivos gerados (build, node_modules)
- ❌ Não use `git add .` sem revisar

**Branches:**

- ✅ Use nomes descritivos
- ✅ Delete branches após merge
- ✅ Mantenha branches curtas (poucos dias)
- ✅ Atualize branch com main regularmente
- ❌ Não trabalhe direto na main
- ❌ Não deixe branches órfãs

**Colaboração:**

- ✅ Faça pull antes de push
- ✅ Revise código antes de merge
- ✅ Use Pull Requests
- ✅ Configure .gitignore corretamente
- ❌ Não force push em branches compartilhadas
- ❌ Não reescreva histórico público

## Configurações Úteis

### Aliases (Atalhos)

```bash
# Configurar aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.aliases "config --get-regexp ^alias\."

# Usar aliases
git st
git co main
git lg
```

### Configurações Recomendadas

```bash
# Colorir output
git config --global color.ui auto

# Definir editor padrão
git config --global core.editor "code --wait"

# Configurar diff tool
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'

# Configurar merge tool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# Evitar commits acidentais em main
git config --global branch.main.mergeoptions "--no-ff"

# Habilitar cache de credenciais
git config --global credential.helper cache
git config --global credential.helper 'cache --timeout=3600'

# Rebase automático ao fazer pull
git config --global pull.rebase true

# Configurar autenticação SSH
ssh-keygen -t ed25519 -C "seu.email@exemplo.com"
cat ~/.ssh/id_ed25519.pub  # Adicionar ao GitHub
```

## Troubleshooting (Resolução de Problemas)

### Problemas Comuns

**1. Desfazer último commit (não enviado):**

```bash
# Mantém mudanças
git reset --soft HEAD~1

# Descarta mudanças
git reset --hard HEAD~1
```

**2. Mudei arquivos errados:**

```bash
# Descartar todas as mudanças
git checkout .
git restore .

# Descartar arquivo específico
git checkout -- arquivo.txt
git restore arquivo.txt
```

**3. Remover arquivo commitado por engano:**

```bash
# Remover do Git mas manter localmente
git rm --cached arquivo-sensivel.txt
git commit -m "Remove arquivo sensível"

# Adicionar ao .gitignore
echo "arquivo-sensivel.txt" >> .gitignore
git add .gitignore
git commit -m "Atualiza .gitignore"
```

**4. Alterar mensagem de commit:**

```bash
# Último commit (não enviado)
git commit --amend -m "Nova mensagem"

# Commit já enviado (cria novo commit)
git revert HEAD
git commit -m "Reverte commit anterior"
```

**5. Conflito ao fazer pull:**

```bash
# Opção 1: Resolver conflitos
git pull origin main
# Resolver conflitos manualmente
git add .
git commit

# Opção 2: Guardar mudanças e pull
git stash
git pull origin main
git stash pop
```

**6. Recuperar branch deletada:**

```bash
# Ver histórico de branches
git reflog

# Recuperar branch
git checkout -b branch-recuperada <commit-hash>
```

**7. Limpar histórico de arquivo grande:**

```bash
# Usar BFG Repo Cleaner
bfg --delete-files arquivo-grande.zip

# Ou git filter-branch
git filter-branch --tree-filter 'rm -f arquivo-grande.zip' HEAD
```

**8. Sincronizar fork com original:**

```bash
# Adicionar repositório original como upstream
git remote add upstream https://github.com/original/repo.git

# Buscar mudanças
git fetch upstream

# Merge com main
git checkout main
git merge upstream/main
git push origin main
```

## Comandos de Referência Rápida

### Básicos

```bash
git init                    # Inicializar repositório
git clone <url>             # Clonar repositório
git status                  # Ver status
git add <arquivo>           # Adicionar ao staging
git commit -m "msg"         # Fazer commit
git push                    # Enviar mudanças
git pull                    # Baixar mudanças
git log                     # Ver histórico
```

### Branches

```bash
git branch                  # Listar branches
git branch <nome>           # Criar branch
git checkout <nome>         # Mudar branch
git checkout -b <nome>      # Criar e mudar
git merge <nome>            # Fazer merge
git branch -d <nome>        # Deletar branch
```

### Remoto

```bash
git remote -v               # Ver remotos
git remote add origin <url> # Adicionar remote
git push -u origin main     # Push inicial
git fetch                   # Buscar mudanças
git pull                    # Fetch + merge
```

### Desfazer

```bash
git restore <arquivo>       # Descartar mudanças
git restore --staged <arq>  # Unstage arquivo
git reset HEAD~1            # Desfazer commit
git revert <commit>         # Reverter commit
git clean -fd               # Limpar untracked
```

### Avançado

```bash
git stash                   # Guardar mudanças
git stash pop               # Recuperar mudanças
git rebase <branch>         # Rebase
git cherry-pick <commit>    # Aplicar commit
git reflog                  # Ver histórico HEAD
git bisect                  # Busca binária
```

## Recursos Adicionais

### Documentação Oficial

- [Git Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/pt-br/v2) (em português)
- [Git Reference](https://git-scm.com/docs)

### Ferramentas Visuais

- **GitKraken**: Interface gráfica poderosa
- **SourceTree**: Git GUI gratuito
- **GitHub Desktop**: Interface oficial do GitHub
- **VS Code**: Git integrado no editor

### Práticas e Tutoriais

- [Learn Git Branching](https://learngitbranching.js.org/)
- [Git Exercises](https://gitexercises.fracz.com/)
- [Oh My Git!](https://ohmygit.org/) - Jogo para aprender Git

### Cheat Sheets

- [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Atlassian Git Cheat Sheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

## Conclusão

Git é uma ferramenta essencial para desenvolvimento moderno de software. Dominar seus conceitos e comandos permite:

- ✅ Controle total sobre o histórico do código
- ✅ Colaboração eficiente em equipe
- ✅ Desenvolvimento paralelo seguro
- ✅ Rastreabilidade de mudanças
- ✅ Reversão rápida de erros

**Próximos Passos:**

1. Pratique os comandos básicos diariamente
2. Experimente criar branches e fazer merges
3. Configure seu ambiente com aliases
4. Explore workflows avançados (Git Flow, GitHub Flow)
5. Contribua para projetos open source

---

**Comandos mais usados no dia a dia:**

```bash
git status
git add .
git commit -m "mensagem"
git push
git pull
git checkout -b nova-branch
git merge branch
git log --oneline
```

Lembre-se: A prática leva à perfeição. Comece simples e evolua gradualmente para técnicas mais avançadas!
