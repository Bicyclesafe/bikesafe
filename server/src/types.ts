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

interface User {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  users: User[];
}