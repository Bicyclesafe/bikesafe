export interface Coordinate {
  id: number
  lat: number
  lng: number
  type: string
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