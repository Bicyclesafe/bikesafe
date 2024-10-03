import axios from "axios"
import { LockStation as LockStationType } from "../types"
import { saveLockStation } from "../controllers/lockStationController"
import { LockStation as LockStationModel } from "../models/lockStation"

const wfsUrl = 'https://kartta.hel.fi/ws/geoserver/avoindata/wfs'
const params = {
  service: 'wfs',
  request: 'GetFeature',
  typeName: 'avoindata:YLRE_Katu_ja_viherosat_eiliikenne_viiva',
  CQL_FILTER: "alatyyppi='Pyöräteline'",
  propertyname: 'geom',
  outputformat: 'json',
  srsName: 'EPSG:4326'
}

interface LockStationResponse {
  features: {
    geometry: {
      coordinates: number[][]
    }
  }[]
}

export const initializeLockStations = async () => {
  const count = await LockStationModel.count()

  if (count === 0) {
    await fetchLockStations()
    console.log('Lock station data fetched.')
  } else {
    console.log('Lock station data already exists, skipping fetch.')
  }
}

export const fetchLockStations = async () => {
  try {
    const response = await axios.get<LockStationResponse>(wfsUrl, { params })
    const data = response.data
  
    const allLockStations: LockStationType[] = data.features.flatMap((feature) => {
      const coordinates = feature.geometry.coordinates
      return coordinates.map((coordinate) => ({
        coordinate: {
          lat: coordinate[1],
          lng: coordinate[0]
        }
      }))
    })
    await storeLockStations(allLockStations)
  } catch(error) {
    console.error('Error fetching lock station data from api:', error)
  }
}

const storeLockStations = async (lockStations: LockStationType[]) => {
  try {
    await Promise.all(
      lockStations.map((lockStation) =>
        saveLockStation(lockStation.coordinate.lat, lockStation.coordinate.lng)
      )
    )
  } catch(error) {
    console.error("Error saving lock stations to database:", error)
  }
}