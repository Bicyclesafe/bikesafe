import { useEffect, useState } from "react"
import axios from "axios"
import Map from "./components/Map"
import { Coordinate } from "./types"

const App = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([])
  const [reportMode, setReportMode] = useState<boolean>(false)

  useEffect(() => {
    axios.get('http://localhost:3000/api/coordinates').then(response => {
      setCoordinates(response.data)
    })
  }, [])

  const reportHandler = () => {
    setReportMode(!reportMode)
    console.log(reportMode)
  }

  return (
    <div>
      <button onClick={reportHandler}>Report theft</button>
      <Map
        coordinates={coordinates}
        reportMode={reportMode}
      />
    </div>
  )
}

export default App
