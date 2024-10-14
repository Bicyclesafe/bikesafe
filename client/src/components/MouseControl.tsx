import { useEffect, FC, useCallback } from "react"
import { useMap } from 'react-leaflet'
import { MousePositionControlProps } from "../types"

const MousePositionControl: FC<MousePositionControlProps> = ({ setCursorPosition }) => {
  const map = useMap()

  const onMouseMove = useCallback((e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng
    setCursorPosition({ lat, lng })
  }, [setCursorPosition])

  useEffect(() => {
    map.on('mousemove', onMouseMove)

    // Cleanup event listener on component unmount
    return () => {
      map.off('mousemove', onMouseMove)
    }
  }, [map, onMouseMove])

  return null
}

export default MousePositionControl
