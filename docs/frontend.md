# Sentinela — Frontend: como funciona

Este documento explica o site: quais telas existem, o que cada uma mostra, de onde vêm os dados e as regras para trabalhar nele.

## 1. O que o site faz

Duas áreas no mesmo site:
- **Pública:** qualquer pessoa vê o risco de alagamento do seu município, o que fazer, onde fica o abrigo e pode enviar um relato. **Não exige cadastro nem login.**
- **Operador:** a pessoa da Defesa Civil (ou quem opera o sistema) entra com usuário e senha, vê o risco em detalhe, aprova ou rejeita alertas, atende a fila de relatos e vê o desempenho do modelo.

O site só **mostra e envia**: as decisões e os cálculos ficam no servidor.

## 2. As telas

### Públicas

| Endereço | Tela | Mostra | Funções do servidor |
|---|---|---|---|
| `/` | `MapaRisco` | Mapa com o nível de cada município, o "o que fazer" e os relatos confirmados (só tipo e posição) | `riscoPublico`, `relatosPublicos` |
| `/abrigos` | `Abrigos` | Abrigos do município e os 2 mais próximos de quem permitir a localização | `abrigosDoMunicipio`, `abrigosProximos` |
| `/relato` | `FazerRelato` | Formulário: tipo, localização e descrição opcional (até 200 caracteres) | `enviarRelato` |

### Do operador (exigem login)

| Endereço | Tela | Mostra | Funções do servidor |
|---|---|---|---|
| `/operador/login` | `Login` | Usuário e senha | `entrar` |
| `/operador` | `PainelRisco` | Risco por município com probabilidade, **motivos**, confiança e data do cálculo; botão "calcular agora" | `riscoOperador`, `historicoRisco`, `recalcularRisco` |
| `/operador/alertas` | `Alertas` | Rascunhos para aprovar ou rejeitar; alertas enviados para encerrar | `listarAlertas`, `editarAlerta`, `aprovarAlerta`, `rejeitarAlerta`, `encerrarAlerta` |
| `/operador/relatos` | `FilaRelatos` | Fila de relatos com texto, origem e estado | `listarRelatos`, `mudarEstadoRelato` |
| `/operador/mapa-relatos` | `MapaRelatos` | Os mesmos relatos como pontos no mapa | `listarRelatos`, `mudarEstadoRelato` |
| `/operador/desempenho` | `Desempenho` | Modelo contra a regra simples, com limitações | `desempenhoDoModelo` |

Cada arquivo de tela começa com um comentário dizendo o que ela deve mostrar e quais funções usa.

## 3. Regras de comportamento das telas

- **Níveis:** `baixo`, `moderado`, `alto`, `severo`, `extremo`, sempre com cor **e** texto (não depender só da cor, por acessibilidade).
- **Dados desatualizados:** se o servidor disser `desatualizado: true`, mostrar um aviso bem visível com a data do último cálculo. Nunca apresentar um risco antigo como se fosse de hoje.
- **Baixa confiança:** quando `confianca` for `baixa`, mostrar o `aviso_confianca`.
- **Aprovar alerta:** pedir confirmação antes, porque a mensagem vai para as pessoas cadastradas.
- **Relatos:** sem opção "preciso de ajuda". Mostrar sempre "Em emergência ligue 199 (Defesa Civil), 193 (Bombeiros) ou 190 (Polícia)".
- **Público:** nunca mostrar o texto de um relato, só tipo e posição.
- **Localização:** usada só para pedir os abrigos mais próximos. O site não guarda.
- **Capacidade do abrigo:** é uma estimativa, deixar isso escrito.
- **Linguagem:** curta e sem termos técnicos.

## 4. Pastas

```
cs-gs-sentinela-frontend/
├── README.md
├── package.json
├── .env.example            endereço do servidor
├── docs/
│   └── frontend.md         este documento
└── src/
    ├── main.tsx            liga o site
    ├── App.tsx             todas as telas e endereços
    ├── index.css           estilo básico
    ├── paginas/
    │   ├── publico/        MapaRisco, Abrigos, FazerRelato
    │   └── operador/       Login, PainelRisco, Alertas, FilaRelatos, MapaRelatos, Desempenho
    ├── componentes/        MapaBase, LayoutPublico, LayoutOperador, RotaProtegida
    ├── servicos/
    │   ├── api.ts          funções que chamam o servidor
    │   └── autenticacao.ts guarda o token do operador
    └── tipos/
        └── api.ts          formato dos dados (o contrato)
```

## 5. Como o site fala com o servidor

1. A tela chama uma função de `servicos/api.ts` (por exemplo, `riscoPublico()`).
2. A função manda o pedido ao endereço do servidor (`VITE_API_URL`) e devolve os dados no formato de `tipos/api.ts`.
3. Nas rotas do operador, a função envia o **token** guardado no login. Sem token válido, o servidor responde `401` e o site deve mandar a pessoa para o login.

O servidor só aceita pedidos vindos do endereço do site (`SITE_URL`, no `.env` do backend).

## 6. Tecnologias

React, TypeScript e Vite (a ferramenta que roda e compila o site), React Router (troca de telas) e Leaflet (mapa, com mapa-base do OpenStreetMap).
