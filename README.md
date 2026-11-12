# Sentinela — site (frontend)

Site do Sentinela: versão **pública** (risco por município, abrigos, fazer um relato) e **área do operador** (painel de risco, alertas, relatos, desempenho do modelo).
O site conversa **somente com o servidor** (repositório `cs-gs-sentinela-backend`).

## Como rodar no seu computador

Precisa de: Node.js 22+ e o servidor rodando (veja o README do backend).

```
npm install
copy .env.example .env
npm run dev
```

Abra o endereço que o terminal mostrar (normalmente http://localhost:5173).

Outros comandos: `npm run build` (confere se compila) e `npm run lint` (confere o estilo do código).

## Onde fica cada coisa

| Pasta / arquivo | Para que serve |
|---|---|
| `src/App.tsx` | Todas as telas e seus endereços |
| `src/paginas/publico/` | Telas públicas (sem login) |
| `src/paginas/operador/` | Telas do operador (com login) |
| `src/componentes/` | Peças reaproveitadas (mapa, molduras, proteção de login) |
| `src/servicos/api.ts` | **Único** lugar que fala com o servidor |
| `src/servicos/autenticacao.ts` | Guarda o token do operador |
| `src/tipos/api.ts` | O formato dos dados do servidor (o contrato) |
| `docs/frontend.md` | **Leia primeiro:** explica as telas e as regras |

## Regras do repositório

- As telas **nunca** usam `fetch` direto: chamam as funções de `src/servicos/api.ts`.
- O formato dos dados vem de `src/tipos/api.ts`, que espelha `docs/backend.md` do servidor (seção 5.3). Se um mudar, avise o grupo.
- O arquivo `.env` não vai para o GitHub.

## Como contribuir

Veja o `CONTRIBUINDO.md`.
