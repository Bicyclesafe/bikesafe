import { useState } from "react"
import Map from "./components/Map"

const App = () => {
  const [reportMode, setReportMode] = useState<boolean>(false)

  const reportHandler = () => {
    setReportMode(!reportMode)
  }

  return (
    <div>
      <button onClick={reportHandler}>Report theft</button>
      <Map
        reportMode={reportMode}
      />
    </div>
  )
}

export default App
