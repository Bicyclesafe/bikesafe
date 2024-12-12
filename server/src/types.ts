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
  name: string
  description: string
  requirement: number
  groupId: number
  level: number
}

export interface AchievementJson {
  achievements: AchievementType[]
}

interface User {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  users: User[];
}