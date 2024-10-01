import axios from "axios"

const wfsUrl = 'https://kartta.hel.fi/ws/geoserver/avoindata/wfs'
const params = {
  service: 'wfs',
  request: 'GetFeature',
  typeName: 'avoindata:YLRE_Katu_ja_viherosat_eiliikenne_viiva',
  CQL_FILTER: "alatyyppi='Pyöräteline'",
  propertyname: 'geom',
  outputformat: 'json'
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

  console.log(data.features.map((feature) =>
    feature.geometry.coordinates
  ))
}