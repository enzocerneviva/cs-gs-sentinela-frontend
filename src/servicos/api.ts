/**
 * ÚNICO lugar que fala com o servidor. As telas chamam estas funções
 * e nunca usam fetch diretamente.
 */
import type {
  AbrigoPublico,
  Alerta,
  Desempenho,
  EstadoAlerta,
  EstadoRelato,
  LoginPedido,
  LoginResposta,
  NovoRelato,
  PontoHistorico,
  RelatoOperador,
  RelatoPublico,
  RespostaRiscoPublico,
  RiscoOperador,
} from '../tipos/api'
import { lerToken } from './autenticacao'

const URL_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export class ErroApi extends Error {
  status: number
  constructor(status: number, mensagem: string) {
    super(mensagem)
    this.status = status
  }
}

async function chamar<T>(caminho: string, opcoes: { metodo?: string; corpo?: unknown; operador?: boolean } = {}): Promise<T> {
  const cabecalhos: Record<string, string> = { 'Content-Type': 'application/json' }
  if (opcoes.operador) {
    const token = lerToken()
    if (token) cabecalhos.Authorization = `Bearer ${token}`
  }
  const resposta = await fetch(`${URL_BASE}${caminho}`, {
    method: opcoes.metodo ?? 'GET',
    headers: cabecalhos,
    body: opcoes.corpo ? JSON.stringify(opcoes.corpo) : undefined,
  })
  if (!resposta.ok) {
    const texto = await resposta.text()
    throw new ErroApi(resposta.status, texto || resposta.statusText)
  }
  return resposta.status === 204 ? (undefined as T) : ((await resposta.json()) as T)
}

// ---------- Públicas ----------
export const riscoPublico = () => chamar<RespostaRiscoPublico>('/publico/risco')
export const abrigosDoMunicipio = (codigoIbge: string) =>
  chamar<AbrigoPublico[]>(`/publico/abrigos?municipio=${codigoIbge}`)
export const abrigosProximos = (lat: number, lon: number) =>
  chamar<AbrigoPublico[]>(`/publico/abrigos/proximos?lat=${lat}&lon=${lon}`)
export const relatosPublicos = () => chamar<RelatoPublico[]>('/publico/relatos')
export const enviarRelato = (relato: NovoRelato) =>
  chamar<{ id: number }>('/publico/relatos', { metodo: 'POST', corpo: relato })

// ---------- Operador ----------
export const entrar = (pedido: LoginPedido) =>
  chamar<LoginResposta>('/operador/login', { metodo: 'POST', corpo: pedido })
export const riscoOperador = () => chamar<RiscoOperador[]>('/operador/risco', { operador: true })
export const historicoRisco = (codigoIbge: string, dias = 30) =>
  chamar<PontoHistorico[]>(`/operador/risco/${codigoIbge}/historico?dias=${dias}`, { operador: true })
export const recalcularRisco = () =>
  chamar<void>('/operador/risco/recalcular', { metodo: 'POST', operador: true })

export const listarAlertas = (estado?: EstadoAlerta) =>
  chamar<Alerta[]>(`/operador/alertas${estado ? `?estado=${estado}` : ''}`, { operador: true })
export const editarAlerta = (id: number, texto: string) =>
  chamar<Alerta>(`/operador/alertas/${id}`, { metodo: 'PATCH', corpo: { texto }, operador: true })
export const aprovarAlerta = (id: number) =>
  chamar<Alerta>(`/operador/alertas/${id}/aprovar`, { metodo: 'POST', operador: true })
export const rejeitarAlerta = (id: number, motivo: string) =>
  chamar<Alerta>(`/operador/alertas/${id}/rejeitar`, { metodo: 'POST', corpo: { motivo }, operador: true })
export const encerrarAlerta = (id: number) =>
  chamar<Alerta>(`/operador/alertas/${id}/encerrar`, { metodo: 'POST', operador: true })

export const listarRelatos = (estado?: EstadoRelato) =>
  chamar<RelatoOperador[]>(`/operador/relatos${estado ? `?estado=${estado}` : ''}`, { operador: true })
export const mudarEstadoRelato = (id: number, estado: EstadoRelato) =>
  chamar<RelatoOperador>(`/operador/relatos/${id}`, { metodo: 'PATCH', corpo: { estado }, operador: true })

export const desempenhoDoModelo = () => chamar<Desempenho>('/operador/desempenho', { operador: true })
