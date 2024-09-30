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

export const getAllLockStations = async () => {
  const response = await axios.get(wfsUrl, { params })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = response.data
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  console.log(data.features.map((feature: any) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    feature.geometry.coordinates[0]
  ))
}