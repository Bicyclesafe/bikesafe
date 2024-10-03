import { FC, useRef } from "react"
import { Marker, useMapEvents } from "react-leaflet"
import { Marker as LeafletMarker } from "leaflet"
import { TheftMarkerProps } from "../types"

export const TheftMarker: FC<TheftMarkerProps> = ({
  reportMode,
  theftPosition,
  setTheftPosition
}) => {
  const markerRef = useRef<LeafletMarker | null>(null)

  useMapEvents({
    click(e) {
      if (!reportMode) {
        return
      }
      setTheftPosition(e.latlng)
      /*setTimeout(() => {
        markerRef.current?.openPopup()
      }, 0)*/
    },
  })

  return theftPosition && (
    <Marker ref={markerRef} position={theftPosition} />
  )
}