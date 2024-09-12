import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Coordinate } from '../types'
import { FC } from 'react'
import { TheftMarker } from './TheftMarker'

const Map: FC<{ coordinates: Coordinate[], reportMode: boolean }> = ({ coordinates, reportMode }) => {
    return (
    <MapContainer 
      center={[60.204149, 24.961733]} 
      zoom={20} 
      scrollWheelZoom={true} 
      style={{ height: '90vh', width: "90vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coordinates.map((coordinate) => (
        <Marker key={coordinate.id} position={[coordinate.lat, coordinate.lng]}>
          <Popup>
            Täällä asuu TKT <br />
          </Popup>
        </Marker>
      ))}
      <TheftMarker
        reportMode={reportMode}
      />
    </MapContainer>
  )
}

export default Map
