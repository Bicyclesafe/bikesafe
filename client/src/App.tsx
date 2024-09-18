import { useState } from "react"
import Map from "./components/Map"
import Notification from "./components/Notification"
import { PinFilter } from "./components/PinFilter"
import { Filters } from "./types"

const App = () => {
  const [reportMode, setReportMode] = useState<boolean>(false)
  const [filters, setFilters] = useState<Filters>({
    bikeTheft: {
      label: 'Theft Locations',
      isChecked: true,
    },
    lockStation: {
      label: 'Lock Stations',
      isChecked: true,
    }
  })

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
      <PinFilter
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
      <button onClick={reportHandler}>{reportMode ? "Leave report theft mode" : "Report theft"}</button>
      <button onClick={reportHandler}>Report theft</button>
      <Notification message={"Place me where the theft happened"} visible={reportMode}/>
      <Map
        reportMode={reportMode}
        filters={filters}
      />
    </div>
  )
}

export default App
