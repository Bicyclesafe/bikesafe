import { useState } from "react"
import Map from "./components/Map"
import Notification from "./components/Notification"

const App = () => {
  const [reportMode, setReportMode] = useState<boolean>(false)

  const reportHandler = () => {
    setReportMode(!reportMode)
  }

  return (
    <div>
      <button onClick={reportHandler}>Report theft</button>
      <Notification message={"Place me where the theft happened"} visible={reportMode}/>
      <Map
        reportMode={reportMode}
      />
    </div>
  )
}

export default App
