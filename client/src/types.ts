export interface Coordinate {
  id: number
  lat: number
  lng: number
}

export interface Pin {
  id: number
  coordinate: Coordinate
}

export interface BikeTheft extends Pin {
  description?: string
}

export interface LockStation {
  id: number
  coordinate: Coordinate
}

export interface TheftMarkerProps {
  reportMode: boolean
  setBikeThefts: React.Dispatch<React.SetStateAction<BikeTheft[]>>
  bikeThefts: BikeTheft[]
}

export interface Filter {
  isChecked: boolean
  label: string
}

export interface Filters {
  [key: string]: Filter
}

export interface PinFilterProps {
  filters: Filters,
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface PinFilterOptionProps {
  name: string
  isChecked: boolean
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface MousePositionControlProps {
  setCursorPosition: (position: { lat: number; lng: number }) => void;
}