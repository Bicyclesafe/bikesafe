import axios from "axios"
import { LockStation } from "../types"
//import fs from "fs"

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

export const getAllLockStations = async () => {
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

  return allLockStations
}