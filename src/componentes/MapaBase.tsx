import type { ReactNode } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

/** Centro aproximado do Vale do Taquari. */
const CENTRO_VALE: [number, number] = [-29.45, -51.95]

/** Mapa-base reaproveitado em todas as telas com mapa. Os pontos entram como "children". */
export default function MapaBase({ children, altura = '480px' }: { children?: ReactNode; altura?: string }) {
  return (
    <MapContainer center={CENTRO_VALE} zoom={9} scrollWheelZoom style={{ height: altura, width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  )
}
