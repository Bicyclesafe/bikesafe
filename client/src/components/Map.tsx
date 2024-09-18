import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Coordinate, Filters } from '../types'
import { FC, useEffect, useState } from 'react'
import { TheftMarker } from './TheftMarker'
import { Pins } from './Pins'
import pinService from '../services/pinService'

const Map: FC<{ reportMode: boolean, filters: Filters }> = ({ reportMode, filters }) => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([])

  useEffect(() => {
    pinService.getAll().then(response => {
      setCoordinates(response.data)
    })
  }, [])

  // tietokannasta ei vielä saa tietoa eri pinnien tyypeistä, niin
  // lisätään tyyppi tässä testausta varten
  // --------------------------------------------------------------------------------------------
  const mid = Math.floor(coordinates.length / 2)
  const lockStationCoordinates = coordinates.slice(0, mid).map(v => ({ ...v, type: 'lockStation' }))
  const bikeTheftCoordinates = coordinates.slice(mid).map(v => ({ ...v, type: 'bikeTheft' }))
  const updatedCoordinates = [...bikeTheftCoordinates, ...lockStationCoordinates]
  // --------------------------------------------------------------------------------------------

  const filteredData = updatedCoordinates.filter(item => filters[item.type]?.isChecked)

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
        coordinates={filteredData}
      />
    </MapContainer>
  )
}

export default Map
