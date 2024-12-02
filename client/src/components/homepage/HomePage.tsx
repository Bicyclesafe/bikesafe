import { useState } from "react"
import MapComponent from "../map/Map"
import Notification from "../notification/Notification"
import { PinFilter } from "../filter/PinFilter"
import { BikeTheft, Filters } from "../../types"
import styles from '../../App.module.css'
import stylesHome from './HomePage.module.css'
import { LatLng } from "leaflet"
import ReportModal from "../report/ReportModal"

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

const HomePage = () => {
  const [reportMode, setReportMode] = useState<boolean>(false)
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [theftPosition, setTheftPosition] = useState<LatLng | null>(null)
  const [bikeThefts, setBikeThefts] = useState<BikeTheft[]>([])
  
  const reportHandler = () => {
    setReportMode(!reportMode)
    setTheftPosition(null)
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
    <div className={stylesHome['home-container']}>
      <div className={stylesHome['filter-container']}>
          <h2>Filters</h2>
          <PinFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          />
          <button className={`${styles['base-button']}`} id={styles['theft-button']} onClick={reportHandler}>{reportMode ? "Cancel" : "Report theft"}</button>
          <Notification message={"Place the pin on the map where the theft happened"} visible={reportMode}/>
          <ReportModal theftPosition={theftPosition} setTheftPosition={setTheftPosition} bikeThefts={bikeThefts} setBikeThefts={setBikeThefts} />
      </div>
      <MapComponent
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

export default HomePage