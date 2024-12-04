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

export interface AchievementType {
  id: number
  name: string
  description: string
  requirement: number
  groupId: number
  level: number
}