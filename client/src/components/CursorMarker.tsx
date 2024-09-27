import { FC, useEffect, useRef } from "react"
import { Marker } from "react-leaflet"
import L from 'leaflet'
import { pinType } from "../util/pins"

const CursorMarker: FC<{ cursorPosition?: { lat: number, lng: number } }> = ({ cursorPosition }) => {
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (markerRef.current && cursorPosition) {
      markerRef.current.setLatLng([cursorPosition.lat, cursorPosition.lng])
    }
  }, [cursorPosition])

  return (
    <Marker
      ref={markerRef}
      position={[cursorPosition?.lat || 0, cursorPosition?.lng || 0]}
      icon={pinType('bikeTheft')}
    />
  )
}

export default CursorMarker
