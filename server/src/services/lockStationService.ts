import axios from "axios"
import { LockStation } from "../types"
import fs from "fs"
import { saveLockStation } from "../controllers/lockStationController"

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

interface LockStationJson {
  lockStations: LockStation[]
}

export const getAllLockStations = async () => {
  if (fs.existsSync("lockStations.json")) {
    return getAllLockStationsFromFile()
  } else {
    return await getAllLockStationsFromApi()
  }
}

export const getAllLockStationsFromApi = async () => {
  const response = await axios.get<LockStationResponse>(wfsUrl, { params })
  const data = response.data

  const allLockStations: LockStation[] = []

  data.features.map((feature) => {
    const coordinates = feature.geometry.coordinates

    const lockStations: LockStation[] = coordinates.map((coordinate) => {
      return {
        coordinate: {
          lat: coordinate[1],
          lng: coordinate[0]
        }
      }
    })

    allLockStations.push(...lockStations)
  })

  writeToLockStationFile(allLockStations)

  await Promise.all(
    allLockStations.map((lockStation) =>
      saveLockStation(lockStation.coordinate.lat, lockStation.coordinate.lng)
    )
  )

  return allLockStations
}

export const getAllLockStationsFromFile = () => {
  const lockStationsJson = fs.readFileSync("lockStations.json")
  const lockStations = JSON.parse(lockStationsJson.toString()) as LockStationJson
  return lockStations.lockStations
}

const writeToLockStationFile = (lockStations: LockStation[]) => {
  const jsonBlock = {
    lockStations: lockStations
  }

  const json = JSON.stringify(jsonBlock)
  fs.writeFileSync("lockStations.json", json, "utf8")
}