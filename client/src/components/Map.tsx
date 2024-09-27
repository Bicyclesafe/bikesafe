import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { BikeTheft, Filters, LockStation } from '../types'
import { FC, useEffect, useState } from 'react'
import { TheftMarker } from './TheftMarker'
import { Pins } from './Pins'
import theftService from '../services/theftService'
import styles from './Map.module.css'
import lockStationService from '../services/lockStationService'
import MousePositionControl from './MouseControl'
import CursorMarker from './CursorMarker'

const Map: FC<{ reportMode: boolean, filters: Filters}> = ({ reportMode, filters }) => {
  const [bikeThefts, setBikeThefts] = useState<BikeTheft[]>([])
  const [lockStations, setLockStations] = useState<LockStation[]>([])
  const [cursorPosition, setCursorPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 })

  useEffect(() => {
    const fetchData = async () => {
      const theftResponse = await theftService.getAllThefts()
      setBikeThefts(theftResponse)

      const lockStationResponse = await lockStationService.getAllLockStations()
      setLockStations(lockStationResponse)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const mapElement = document.getElementById('map')
    if (mapElement) {
      if (reportMode) {
        mapElement.style.cursor = 'pointer'
      } else {
        mapElement.style.cursor = '' 
      }
    }
  }, [reportMode]) 

  return (
    <MapContainer 
      center={[60.204149, 24.961733]} 
      zoom={20} 
      scrollWheelZoom={true} 
      className={styles['map-container']}
      id='map'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TheftMarker
        bikeThefts={bikeThefts}
        setBikeThefts={setBikeThefts}
        reportMode={reportMode}
      />
      {reportMode ? <MousePositionControl setCursorPosition={setCursorPosition} /> : null}
      <Pins
        pinData={bikeThefts.map(theft => theft.coordinate)}
        isChecked={filters.bikeTheft.isChecked}
        typeOfPin={'bikeTheft'}
      />
      <Pins
        pinData={lockStations.map(station => station.coordinate)}
        isChecked={filters.lockStation.isChecked}
        typeOfPin={'lockStation'}
      />
       {reportMode && <CursorMarker cursorPosition={cursorPosition} />}
       {reportMode && <MousePositionControl setCursorPosition={setCursorPosition} />}
    </MapContainer>
  )
}

export default Map
