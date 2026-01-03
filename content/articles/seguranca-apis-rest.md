---
date: 2026-01-01
author: Guilherme Rossi Kirsten
tags: [Segurança, APIs, REST, Autenticação, Backend, Endpoints]
---

# Boas Práticas de Segurança em APIs REST

A segurança em APIs REST é fundamental para proteger dados sensíveis e prevenir ataques. Vamos explorar as principais práticas que todo desenvolvedor deve implementar.

## Autenticação e Autorização

### JWT (JSON Web Tokens)

JWTs são uma forma segura de transmitir informações entre cliente e servidor:

```javascript
const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Token inválido");
  }
}
```

### OAuth 2.0

Para aplicações que precisam acessar recursos de terceiros, OAuth 2.0 é o padrão da indústria.

## Rate Limiting

Implemente rate limiting para prevenir ataques de força bruta e DDoS:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo de 100 requisições
  message: "Muitas requisições, tente novamente mais tarde",
});

app.use("/api/", limiter);
```

## Validação de Entrada

**Sempre valide e sanitize os dados de entrada:**

```javascript
const { body, validationResult } = require("express-validator");

app.post(
  "/api/users",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Processar dados validados
  },
);
```

## HTTPS Obrigatório

- Use HTTPS em produção **sempre**
- Redirecione HTTP para HTTPS automaticamente
- Configure certificados SSL/TLS válidos
- Use HSTS (HTTP Strict Transport Security)

## Headers de Segurança

Configure headers adequados para proteger sua aplicação:

```javascript
const helmet = require("helmet");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }),
);
```

## Prevenção de SQL Injection

Use prepared statements ou ORMs:

```javascript
// ❌ Vulnerável a SQL Injection
const query = `SELECT * FROM users WHERE email = '${userInput}'`;

// ✅ Seguro
const query = "SELECT * FROM users WHERE email = ?";
connection.query(query, [userInput]);
```

## CORS Configurado Corretamente

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS.split(","),
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
```

## Logging e Monitoramento

Implemente logging adequado para auditoria:

- Registre todas as tentativas de autenticação
- Log de acessos a recursos sensíveis
- Monitore padrões anormais de requisições
- **Nunca** logue senhas ou tokens

## Tratamento de Erros

Não exponha detalhes de implementação em erros:

```javascript
// ❌ Ruim
res.status(500).json({
  error: error.stack,
});

// ✅ Bom
res.status(500).json({
  error: "Erro interno do servidor",
});

// Log completo apenas no servidor
logger.error("Erro detalhado:", error);
```

## Checklist de Segurança

- [ ] HTTPS configurado
- [ ] Autenticação implementada
- [ ] Rate limiting ativo
- [ ] Validação de entrada em todas as rotas
- [ ] Headers de segurança configurados
- [ ] CORS configurado adequadamente
- [ ] Logging e monitoramento ativos
- [ ] Secrets em variáveis de ambiente
- [ ] Dependências atualizadas
- [ ] Testes de segurança realizados

## Conclusão

Segurança não é opcional - é essencial. Implemente essas práticas desde o início do projeto e revise regularmente sua implementação. Lembre-se: a segurança é um processo contínuo, não um objetivo único.

**Mantenha-se atualizado** sobre novas vulnerabilidades e práticas de segurança através do OWASP Top 10 e CVE databases.
