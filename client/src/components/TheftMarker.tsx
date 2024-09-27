import { LatLng } from "leaflet"
import { FC, useRef, useState, isValidElement } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"
import { Marker as LeafletMarker } from "leaflet"
import { sendTheftReport } from "../services/theftService"
import { TheftMarkerProps } from "../types"
import * as React from 'react'

console.log(isValidElement(React))

export const TheftMarker: FC<TheftMarkerProps> = ({
  reportMode,
  setBikeThefts,
  bikeThefts
}) => {
  const [position, setPosition] = useState<LatLng | null>(null)
  const markerRef = useRef<LeafletMarker | null>(null)

  useMapEvents({
    click(e) {
      if (!reportMode) {
        return
      }
      setPosition(e.latlng)
      setTimeout(() => {
        markerRef.current?.openPopup()
      }, 0) 
    },
  })

  const handleReportConfirm = async (position: LatLng) => {
    const newMarker = await sendTheftReport(position)
    setBikeThefts(bikeThefts.concat(newMarker))
    setPosition(null)
  }

  return position && (
    <Marker ref={markerRef} position={position}>
      <Popup>
        <button onClick={() => handleReportConfirm(position)}>Confirm</button>
      </Popup>
    </Marker>
  )
}