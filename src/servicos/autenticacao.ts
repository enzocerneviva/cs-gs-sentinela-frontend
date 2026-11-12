/** Guarda o token do operador enquanto a aba estiver aberta. */
const CHAVE = 'sentinela_token'

export const guardarToken = (token: string) => sessionStorage.setItem(CHAVE, token)
export const lerToken = () => sessionStorage.getItem(CHAVE)
export const sair = () => sessionStorage.removeItem(CHAVE)
export const estaLogado = () => lerToken() !== null
