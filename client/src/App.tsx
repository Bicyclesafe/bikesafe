import { useState } from "react"
import Map from "./components/Map"
import Notification from "./components/Notification"
import { PinFilter } from "./components/PinFilter"
import { Filters } from "./types"
import styles from './App.module.css'

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
      </div>
      <Map
        reportMode={reportMode}
        filters={filters}
      />
    </div>
  )
}

export default App