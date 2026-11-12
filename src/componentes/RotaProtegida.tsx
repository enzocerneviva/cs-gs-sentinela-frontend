import { Navigate, Outlet } from 'react-router-dom'
import { estaLogado } from '../servicos/autenticacao'

/** Só deixa passar quem fez login. Sem token, manda para a tela de login. */
export default function RotaProtegida() {
  return estaLogado() ? <Outlet /> : <Navigate to="/operador/login" replace />
}
