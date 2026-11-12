import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { entrar } from '../../servicos/api'
import { guardarToken } from '../../servicos/autenticacao'

/**
 * TELA DO OPERADOR: login. Já funciona de ponta a ponta quando o servidor tiver a rota /operador/login.
 * Sem cadastro: as contas são criadas pelo grupo.
 */
export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const navegar = useNavigate()

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault()
    setErro(null)
    try {
      const resposta = await entrar({ usuario, senha })
      guardarToken(resposta.token)
      navegar('/operador')
    } catch {
      setErro('Usuário ou senha incorretos.')
    }
  }

  return (
    <main className="pagina">
      <h1>Entrar (operador)</h1>
      <form onSubmit={enviar}>
        <p>
          <label>
            Usuário <input value={usuario} onChange={(e) => setUsuario(e.target.value)} />
          </label>
        </p>
        <p>
          <label>
            Senha <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </label>
        </p>
        {erro && <p role="alert">{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
    </main>
  )
}
