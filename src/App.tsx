import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutOperador from './componentes/LayoutOperador'
import LayoutPublico from './componentes/LayoutPublico'
import RotaProtegida from './componentes/RotaProtegida'
import Abrigos from './paginas/publico/Abrigos'
import FazerRelato from './paginas/publico/FazerRelato'
import MapaRisco from './paginas/publico/MapaRisco'
import Alertas from './paginas/operador/Alertas'
import Desempenho from './paginas/operador/Desempenho'
import FilaRelatos from './paginas/operador/FilaRelatos'
import Login from './paginas/operador/Login'
import MapaRelatos from './paginas/operador/MapaRelatos'
import PainelRisco from './paginas/operador/PainelRisco'

/** Aqui ficam TODAS as telas e seus endereços. */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Versão pública: sem login */}
        <Route element={<LayoutPublico />}>
          <Route index element={<MapaRisco />} />
          <Route path="abrigos" element={<Abrigos />} />
          <Route path="relato" element={<FazerRelato />} />
        </Route>

        {/* Área do operador: exige login */}
        <Route path="operador/login" element={<Login />} />
        <Route path="operador" element={<RotaProtegida />}>
          <Route element={<LayoutOperador />}>
            <Route index element={<PainelRisco />} />
            <Route path="alertas" element={<Alertas />} />
            <Route path="relatos" element={<FilaRelatos />} />
            <Route path="mapa-relatos" element={<MapaRelatos />} />
            <Route path="desempenho" element={<Desempenho />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
