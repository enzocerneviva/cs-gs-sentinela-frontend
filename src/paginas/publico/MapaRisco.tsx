import MapaBase from '../../componentes/MapaBase'

/**
 * TELA PÚBLICA: risco por município.
 * Mostra: mapa do Vale com o nível (baixo...extremo) de cada município, o "o que fazer"
 *         e os pontos de relatos CONFIRMADOS (só tipo e posição, sem texto).
 * Usa:    riscoPublico()  e  relatosPublicos()   (src/servicos/api.ts)
 * Atenção: se "desatualizado" vier true, avisar bem visível.
 */
export default function MapaRisco() {
  return (
    <>
      <h1>Risco de alagamento no Vale do Taquari</h1>
      <p className="nota">Tela a construir. Por enquanto, só o mapa-base.</p>
      <MapaBase />
    </>
  )
}
