import { Link, Outlet, useNavigate } from 'react-router-dom'
import { sair } from '../servicos/autenticacao'

/** Moldura das telas do operador. */
export default function LayoutOperador() {
  const navegar = useNavigate()
  return (
    <>
      <nav className="barra">
        <span className="marca">Sentinela · Operador</span>
        <Link to="/operador">Risco</Link>
        <Link to="/operador/alertas">Alertas</Link>
        <Link to="/operador/relatos">Relatos</Link>
        <Link to="/operador/mapa-relatos">Mapa de relatos</Link>
        <Link to="/operador/desempenho">Desempenho</Link>
        <button
          onClick={() => {
            sair()
            navegar('/operador/login')
          }}
        >
          Sair
        </button>
      </nav>
      <main className="pagina">
        <Outlet />
      </main>
    </>
  )
}
