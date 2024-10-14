export interface Coordinate {
  lat: number
  lng: number
}

export interface LockStation {
  coordinate: Coordinate
}

export interface LockStationLines {
  coordinates: Coordinate[]
}