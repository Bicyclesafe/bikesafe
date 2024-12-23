import { Duration } from "date-fns"
import { BarDatum, ComputedBarDatum } from "@nivo/bar"
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

export interface FilterProps {
  filters: Filters,
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface FilterOptionProps {
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

export interface LineLayerProps {
  innerHeight: number
  bars: BarInfo[]
  data: BarDatum[]
  color: string
  viewMode: string
  highestValue: number
}

export interface LineLayerInfo{
  data: BarDatum[]
  color: string
  innerHeight: number
  bars: readonly ComputedBarDatum<BarDatum>[]
}

export interface ChartData {
  time: Date
  value: number
}

export interface BarInfo {
  width: number
  x: number
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

export interface AchievementType {
  name: string
  description: string
  requirement: number
  groupId: number
  level: number
}

export interface AchievementData {
  sumOfTrips: number
  emissionsSaved?: number
  tripCount: number
  consecutiveCount: number
}

export interface AchievementGroupProps {
  achievements: AchievementType[]
  achievementData: AchievementData
}

export interface AllTripsProps {
  id: number
  userId: number
  startTime: string
  endTime: string
}

export interface CompanyStatistics {
  company: {
    id: number
    name: string
  }
  distancesByMonth: {
    month: number
    distance: number
    co2SavedKg: number
  }[]
  activeCyclistsByMonth: {
    month: number
    activeCyclists: number
  }[]
  yearlyTotalDistance: number
}

export interface MonthlyStatisticsProps {
  statistics: CompanyStatistics;
  selectedDate: Date;
}

export interface StatisticSectionProps {
  label: string;
  currentValue: number;
  previousValue: number;
  renderChange: (currentValue: number, previousValue: number) => JSX.Element;
  unit: string;
}

export interface CompanyStatistics {
  company: {
    id: number
    name: string
  }
  distancesByMonth: {
    month: number
    distance: number
    co2SavedKg: number
  }[]
  tripsByCategory: Record<number, TripCategoryCounts>
  activeCyclistsByMonth: {
    month: number
    activeCyclists: number
  }[]
  yearlyTotalDistance: number
}

export interface TripCategoryCounts {
  short: number;
  medium: number;
  long: number;
}

export interface TripsByMonth {
  [month: number]: TripCategoryCounts;
}