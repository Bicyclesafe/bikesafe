import { useState } from "react"
import Map from "./components/Map"
import Notification from "./components/Notification"
import { PinFilter } from "./components/PinFilter"
import { BikeTheft, Filters } from "./types"
import styles from './App.module.css'
import { LatLng } from "leaflet"
import ReportModal from "./components/ReportModal"

const initialFilters: Filters = {
  bikeTheft: {
    label: 'Theft Locations',
    isChecked: true,
  },
  lockStation: {
    label: 'Lock Stations',
    isChecked: true,
  }
}

const App = () => {
  const [reportMode, setReportMode] = useState<boolean>(false)
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [theftPosition, setTheftPosition] = useState<LatLng | null>(null)
  const [bikeThefts, setBikeThefts] = useState<BikeTheft[]>([])
  
  const reportHandler = () => {
    setReportMode(!reportMode)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: {
        ...prevFilters[name],
        isChecked: checked
      }
    }))
  }

  return (
    <div>
      <div className={styles['content-container']}>
        <PinFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
        <button className={styles['theft-button']} onClick={reportHandler}>{reportMode ? "Cancel" : "Report theft"}</button>
        <Notification message={"Place me where the theft happened"} visible={reportMode}/>
        <ReportModal theftPosition={theftPosition} setTheftPosition={setTheftPosition} bikeThefts={bikeThefts} setBikeThefts={setBikeThefts} />
      </div>
      <Map
        reportMode={reportMode}
        filters={filters}
        theftPosition={theftPosition}
        setTheftPosition={setTheftPosition}
        bikeThefts={bikeThefts}
        setBikeThefts={setBikeThefts}
      />
    </div>
  )
}

export default App