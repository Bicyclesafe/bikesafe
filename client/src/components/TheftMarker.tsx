import axios from "axios"
import { LatLng } from "leaflet"
import { FC, useState } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"

export const TheftMarker: FC<{ reportMode: boolean }> = ({ reportMode }) => {
  const [position, setPosition] = useState<LatLng | null>(null)

  useMapEvents({
    click(e) {
      if (!reportMode) {
        return null
      }
      setPosition(e.latlng)
      axios.post('http://localhost:3000/api/coordinates', e.latlng)
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}