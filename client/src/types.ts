import { Duration } from "date-fns"
import { LatLng } from "leaflet"

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
  groupId: number
}

export interface PersonalGoal {
  id: number
  goalDistance: number
  startTime: Date
  endTime: Date
  userId: number
}

export interface PinsProps {
  pinData: Coordinate[]
  isChecked: boolean
  typeOfPin: string
  deletePin: (id: number) => void
}

export interface TheftMarkerProps {
  reportMode: boolean
  theftPosition: LatLng | null
  setTheftPosition: React.Dispatch<React.SetStateAction<LatLng | null>>
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

export interface MapProps {
  reportMode: boolean
  filters: Filters
  theftPosition: LatLng | null
  setTheftPosition: React.Dispatch<React.SetStateAction<LatLng | null>>
  bikeThefts: BikeTheft[]
  setBikeThefts: React.Dispatch<React.SetStateAction<BikeTheft[]>>
}

export interface ReportModalProps {
  theftPosition: LatLng | null
  setTheftPosition: React.Dispatch<React.SetStateAction<LatLng | null>>
  setBikeThefts: React.Dispatch<React.SetStateAction<BikeTheft[]>>
  bikeThefts: BikeTheft[]
}

export interface Trip extends BaseTrip{
  id: number
  userId: number
  tripDistance: number
}

export interface BaseTrip {
  startTime: Date
  endTime: Date
}

export interface TripProps extends BaseTrip {
  tripDistance: number
}

export interface SeasonalDistanceProps {
  distance: number;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
}

export interface ManualTripsProps {
  distance: number;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
}

export interface StatsDataProps {
  yearlyTotalDistance: number
  longestTripDistance: number
  yearlyTotalDuration: Duration
  longestTripDuration: Duration
  yearlyAverageDuration: Duration
  co2EmissionsSaved: number
  yearlyAverageSpeed: number
  yearlyCaloriesBurned: number
}

export interface Statistic {
  title: React.ReactNode
  value: number | Duration
  unit: string
  type: "distance" | "duration" | "impact"
}