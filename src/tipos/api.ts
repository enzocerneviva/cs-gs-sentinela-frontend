/**
 * TIPOS DA API = o contrato com o servidor (docs/backend.md, seção 5.3).
 * Se o servidor mudar um formato, muda aqui e o TypeScript aponta o que quebrou.
 */

export type NivelRisco = 'baixo' | 'moderado' | 'alto' | 'severo' | 'extremo'
export type Confianca = 'normal' | 'baixa'
export type TipoRelato =
  | 'agua_na_rua'
  | 'rua_bloqueada'
  | 'rio_ou_arroio_subindo'
  | 'abrigo_lotado_ou_fechado'
  | 'outro'
export type EstadoRelato = 'novo' | 'confirmado' | 'em_tratamento' | 'resolvido' | 'descartado'
export type EstadoAlerta = 'rascunho' | 'aprovado' | 'rejeitado' | 'enviado' | 'encerrado'

// ---------- Públicas ----------

export interface RiscoPublico {
  codigo_ibge: string
  nome: string
  nivel: NivelRisco
  o_que_fazer: string
  confianca: Confianca
}

export interface RespostaRiscoPublico {
  calculado_em: string
  desatualizado: boolean
  municipios: RiscoPublico[]
}

export interface AbrigoPublico {
  nome: string
  endereco: string
  latitude: number
  longitude: number
  link_rota: string
  capacidade_estimada: number | null // é uma ESTIMATIVA
}

/** O público só vê tipo e posição (nunca o texto). */
export interface RelatoPublico {
  id: number
  tipo: TipoRelato
  latitude: number
  longitude: number
}

export interface NovoRelato {
  tipo: TipoRelato
  latitude: number
  longitude: number
  descricao?: string // opcional, até 200 caracteres
}

// ---------- Operador ----------

export interface LoginPedido {
  usuario: string
  senha: string
}

export interface LoginResposta {
  token: string
  expira_em: string
}

export interface RiscoOperador {
  codigo_ibge: string
  nome: string
  data_referencia: string
  probabilidade: number // 0 a 1
  nivel: NivelRisco
  motivos: string[]
  confianca: Confianca
  aviso_confianca: string | null
  calculado_em: string
}

export interface PontoHistorico {
  data_referencia: string
  probabilidade: number
  nivel: NivelRisco
}

export interface Alerta {
  id: number
  codigo_ibge: string
  nome_municipio: string
  nivel: NivelRisco
  texto: string
  estado: EstadoAlerta
  motivo_rejeicao: string | null
  criado_em: string
  decidido_em: string | null
  enviado_em: string | null
  encerrado_em: string | null
}

export interface RelatoOperador {
  id: number
  tipo: TipoRelato
  latitude: number
  longitude: number
  descricao: string | null
  estado: EstadoRelato
  origem: 'site' | 'whatsapp'
  criado_em: string
  atualizado_em: string
}

/** Valores de 0 a 1 (exceto os que dizem "dias" ou "por ano"). */
export interface MetricasModelo {
  alertas_por_municipio_ano: number
  recall_modelo: number
  recall_regra_simples: number
  pessoas_cobertas_modelo: number
  pessoas_cobertas_regra_simples: number
  antecedencia_media_dias: number
  brier: number
}

export interface Desempenho {
  executada_em: string
  modelo: string
  metricas: MetricasModelo
}

/** Formato de erro do servidor (FastAPI). */
export interface ErroServidor {
  detail: string | unknown
}
