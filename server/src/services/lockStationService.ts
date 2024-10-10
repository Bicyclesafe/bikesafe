import axios from "axios"
import { saveLockStation } from "../controllers/lockStationController"
import { LockStationLines } from "../types"



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
  //const count = await LockStationModel.count()
  await fetchLockStations()

  // if (count === 0) {
  //   await fetchLockStations()
  //   console.log('Lock station data fetched.')
  // } else {
  //   console.log('Lock station data already exists, skipping fetch.')
  // }
}

export const fetchLockStations = async () => {
    try {
      const response = await axios.get<LockStationResponse>(wfsUrl, { params })
      const data = response.data
    
      const allLockStations: LockStationLines[] = data.features.map((feature) => {
        const coordinates = feature.geometry.coordinates
        const coordinateMap = coordinates.map((coordinate) => ({
            lat: coordinate[1],
            lng: coordinate[0]
        }))
        return {
          coordinates: coordinateMap
        }
      })
      await storeLockStations(allLockStations)
    } catch(error) {
      console.error('Error fetching lock station data from api:', error)
    }
}

// const storeLockStations = async (lockStations: LockStationLines[]) => {
//   //console.log(lockStations)
//   try {
//       lockStations.map(async(lockStation) => {
//         await saveLockStation(lockStation.coordinates)
//     })
//   } catch(error) {
//     console.error("Error saving lock stations to database:", error)
//   }
// }

export const storeLockStations = async (lockStations: LockStationLines[]) => {
  try {
    for (let i = 0; i < lockStations.length; i++) {
      await saveLockStation(lockStations[i].coordinates)
    }
  } catch (error) {
    console.error("Error saving lock stations to database:", error)
  }
}