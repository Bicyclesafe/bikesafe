import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { LockStation, MapProps } from '../../types'
import { FC, useEffect, useState } from 'react'
import { TheftMarker } from '../pins/TheftMarker'
import { Pins } from '../pins/Pins'
import theftService from '../../services/theftService'
import styles from './Map.module.css'
import lockStationService from '../../services/lockStationService'
import MarkerClusterGroup from "react-leaflet-cluster"
import LockStationMarker from '../pins/LockStationMarker'
import CursorPosition from '../cursor/CursorPosition'
import { useAuth } from '../../hooks/useAuth'

const MapComponent: FC<MapProps> = ({ reportMode, filters, theftPosition, setTheftPosition, bikeThefts, setBikeThefts }) => {
  const [lockStations, setLockStations] = useState<LockStation[][]>([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const token = await user?.getIdToken(true)
      const theftResponse = await theftService.getAllThefts(token as string)
      setBikeThefts(theftResponse)
      const lockStationResponse = await lockStationService.getAllLockStations(token as string)
      const lockStationsGrouped = groupLockstations(lockStationResponse)
      setLockStations(lockStationsGrouped)
    }
    fetchData()
  }, [setBikeThefts, user])

  useEffect(() => {
    const mapElement = document.getElementById('map')
    if (mapElement) {
      mapElement.style.cursor = reportMode ? 'pointer' : ''
    }
  }, [reportMode])

  const deleteTheftMarker = async (coordinateId: number) => {
    const token = await user?.getIdToken(true)
    const bikeTheftToDelete = bikeThefts.find(
      theft => theft.coordinate.id === coordinateId
    )
    if (bikeTheftToDelete) {
      theftService.deleteTheft(token as string, bikeTheftToDelete.id)
      setBikeThefts(bikeThefts.filter(theft => theft.id !== bikeTheftToDelete.id))
    }
  }

  const groupLockstations = (lockStationData: LockStation[])  => {
    const groups = new Map<number, LockStation[]>()

    for (let i = 0; i < lockStationData.length; i++) {
      if (!groups.has(lockStationData[i].groupId)) {
        groups.set(lockStationData[i].groupId, [])
      }

      groups.get(lockStationData[i].groupId)?.push(lockStationData[i])
    }

    const lockStationsGrouped = Array.from(groups).map((group) => group[1])
    return lockStationsGrouped
  }

  return (
    <MapContainer 
    center={[60.1695, 24.9354]} // Centered on Helsinki
    zoom={13} // Set an appropriate initial zoom level
    scrollWheelZoom={true}
    className={styles['map-container']}
    id='map'
    preferCanvas={true}
    minZoom={8}
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
      {filters.lockStation.isChecked && lockStations.map((stationsGroup) => (
        <LockStationMarker key={stationsGroup[0]?.groupId} stationsGroup={stationsGroup} />
      ))}
      {reportMode && <CursorPosition />}
    </MapContainer>
  )
}

export default MapComponent
