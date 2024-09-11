import { useEffect, useState } from "react"
import axios from "axios"
import Map from "./components/Map"
import { Coordinate } from "./types"

const App = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([])
  useEffect(() => {
    axios.get('http://localhost:3000/coordinates').then(response => {
      setCoordinates(response.data)
    })
  }, [])

  
  return (
    <div> <Map coordinates = {coordinates}/> </div>
  )
}

export default App
