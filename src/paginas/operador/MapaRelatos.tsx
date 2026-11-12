import MapaBase from '../../componentes/MapaBase'

/**
 * TELA DO OPERADOR: mapa de relatos (os mesmos dados da fila, em pontos no mapa).
 * Cor/ícone por estado. Ao clicar no ponto: tipo, texto e botões de mudar estado.
 * Usa:    listarRelatos()  mudarEstadoRelato()
 */
export default function MapaRelatos() {
  return (
    <>
      <h1>Mapa de relatos</h1>
      <p className="nota">Tela a construir. Por enquanto, só o mapa-base.</p>
      <MapaBase />
    </>
  )
}
