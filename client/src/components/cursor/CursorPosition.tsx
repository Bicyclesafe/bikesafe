import { useEffect, useCallback, useState } from "react"
import { useMap } from 'react-leaflet'
import CursorPin from "./CursorPin"

const CursorPosition = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 })
  const map = useMap()

  const onMouseMove = useCallback((e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng
    setPosition({ lat, lng })
  }, [setPosition])

  useEffect(() => {
    map.on('mousemove', onMouseMove)

    // Cleanup event listener on component unmount
    return () => {
      map.off('mousemove', onMouseMove)
    }
  }, [map, onMouseMove])

  return <CursorPin position={position} />

}

export default CursorPosition
