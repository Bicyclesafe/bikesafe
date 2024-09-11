import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Coordinate } from '../types'
import { FC } from 'react'

const Map: FC<{ coordinates: Coordinate[] }> = ({ coordinates }) => {
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
        <Marker key={coordinate.id} position={[coordinate.latitude, coordinate.longitude]}>
          <Popup>
            Täällä asuu TKT <br />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map
