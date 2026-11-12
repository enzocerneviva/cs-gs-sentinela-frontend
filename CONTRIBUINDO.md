# Como trabalhamos neste repositório

## Regra de ouro

**Ninguém envia direto para a `main`.** Todo trabalho entra por **Pull Request** (PR).
**Um cartão do Trello = um ramo = um Pull Request**, pequeno, para ser revisado rápido.

## Passo a passo

```
git switch main
git pull
git switch -c modelo/regressao-logistica     # cria o seu ramo
# ... trabalhe e teste ...
git add .
git commit -m "Adiciona regressão logística"
git push -u origin modelo/regressao-logistica
```
Depois abra o Pull Request no GitHub.

- **Nome do ramo:** `área/descrição-curta`. Áreas: `dados`, `modelo`, `servidor`, `zap`, `site`, `entrega`. Exemplos: `servidor/login-operador`, `site/mapa-de-risco`.
- **Commits:** frase curta, no imperativo, em português: "Adiciona carregamento do Atlas".
- **Título do PR:** começa com o código do cartão: `MOD-3 Regressão logística`.

## Antes de abrir o Pull Request

- Backend: `pytest`
- Frontend: `npm run build` e `npm run lint`
- Atualize com a `main` para evitar conflito: `git switch main`, `git pull`, `git switch seu-ramo`, `git merge main`.

## Revisão e merge

1. Outra pessoa do grupo lê e aprova.
2. Se ninguém responder em **12 horas**, quem abriu pode fazer o merge e avisa no grupo (o prazo é curto).
3. Use **"Squash and merge"** no GitHub (deixa o histórico limpo) e apague o ramo depois.

## Mudou um contrato? Avise antes

Contratos são os formatos combinados entre as partes. Mexer neles afeta todo mundo.

| Repositório | Arquivos de contrato |
|---|---|
| Backend | `app/contratos.py`, `app/banco/esquema.sql`, `docs/backend.md` (seção 5) |
| Frontend | `src/tipos/api.ts` |

Coloque o rótulo **`contrato`** no PR e espere o "ok" das **3 pessoas**. Se o formato mudou, o outro repositório precisa do PR correspondente.

## Segredos

Nunca envie `.env`, tokens ou senhas. Se algo vazar, **troque o token na hora** (por exemplo, gere um novo no painel da Meta).

## Proteger a `main`

No GitHub, em *Settings*, procure as regras de proteção de ramo e ative "exigir Pull Request antes do merge". Se o plano do repositório não permitir, vale a combinação do grupo.
