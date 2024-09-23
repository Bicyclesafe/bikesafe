export interface Coordinate {
  id: number
  lat: number
  lng: number
  // type: string
}

export interface BikeTheft {
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

/**
 * haha
 */
export interface PinFilterOptionProps {
  name: string
  isChecked: boolean
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}