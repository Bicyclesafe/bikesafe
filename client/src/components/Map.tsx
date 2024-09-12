import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Coordinate } from '../types'
import { FC, useEffect, useState } from 'react'
import { TheftMarker } from './TheftMarker'
import { Pins } from './Pins'
import pinService from '../services/pinService'

const Map: FC<{ reportMode: boolean }> = ({ reportMode }) => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([])

  useEffect(() => {
    pinService.getAll().then(response => {
      setCoordinates(response.data)
    })
  }, [])

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
      <TheftMarker
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        reportMode={reportMode}
      />
      <Pins
        coordinates={coordinates}
      />
    </MapContainer>
  )
}

export default Map
