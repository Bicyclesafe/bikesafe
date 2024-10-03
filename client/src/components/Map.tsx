import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Circle } from 'react-leaflet'
import { LockStation, MapProps } from '../types'
import { FC, useEffect, useState } from 'react'
import { TheftMarker } from './TheftMarker'
import { Pins } from './Pins'
import theftService from '../services/theftService'
import styles from './Map.module.css'
import lockStationService from '../services/lockStationService'
import MousePositionControl from './MouseControl'
import CursorMarker from './CursorMarker'
import MarkerClusterGroup from "react-leaflet-cluster"
import ZoomLevelUpdater from './ZoomLevel'

const Map: FC<MapProps> = ({ reportMode, filters, theftPosition, setTheftPosition, bikeThefts, setBikeThefts }) => {
  const [lockStations, setLockStations] = useState<LockStation[]>([])
  const [cursorPosition, setCursorPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 })
  const [zoomLevel, setZoomLevel] = useState<number>(13) 

  useEffect(() => {
    const fetchData = async () => {
      const theftResponse = await theftService.getAllThefts()
      setBikeThefts(theftResponse)

      const lockStationResponse = await lockStationService.getAllLockStations()
      setLockStations(lockStationResponse)
    }
    fetchData()
  }, [setBikeThefts])

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

  const deleteTheftMarker = (coordinateId: number) => {
    const bikeTheftToDelete = bikeThefts.find(
      theft => theft.coordinate.id === coordinateId
    )
    if (bikeTheftToDelete) {
      theftService.deleteTheft(bikeTheftToDelete.id)
      setBikeThefts(bikeThefts.filter(theft => theft.id !== bikeTheftToDelete.id))
    }
  }

  return (
    <MapContainer 
      center={[60.204149, 24.961733]} 
      zoom={20} 
      scrollWheelZoom={true} 
      className={styles['map-container']}
      id='map'
      preferCanvas={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TheftMarker
        reportMode={reportMode}
        theftPosition={theftPosition}
        setTheftPosition={setTheftPosition}
      />
      {reportMode ? <MousePositionControl setCursorPosition={setCursorPosition} /> : null}
      <MarkerClusterGroup 
      chunkedLoading
      disableClusteringAtZoom={18}
      >
        <Pins
          pinData={bikeThefts.map(theft => theft.coordinate)}
          isChecked={filters.bikeTheft.isChecked}
          typeOfPin={'bikeTheft'}
          deletePin={deleteTheftMarker}
        />
      </MarkerClusterGroup>
      {filters.lockStation.isChecked && zoomLevel > 9 &&lockStations.map((station) => (
        <Circle
          key={station.id}
          center={[station.coordinate.lat, station.coordinate.lng]}
          color="#ff3333"
          radius={5}
        />
      ))}
      {reportMode && <CursorMarker cursorPosition={cursorPosition} />}
      {reportMode && <MousePositionControl setCursorPosition={setCursorPosition} />}
      <ZoomLevelUpdater setZoomLevel={setZoomLevel} />
    </MapContainer>
  )
}

export default Map
