import { Link, Outlet } from 'react-router-dom'

/** Moldura das telas públicas: barra de cima + conteúdo da tela. */
export default function LayoutPublico() {
  return (
    <>
      <nav className="barra">
        <span className="marca">Sentinela</span>
        <Link to="/">Risco</Link>
        <Link to="/abrigos">Abrigos</Link>
        <Link to="/relato">Fazer um relato</Link>
        <Link to="/operador">Área do operador</Link>
      </nav>
      <main className="pagina">
        <Outlet />
      </main>
    </>
  )
}
