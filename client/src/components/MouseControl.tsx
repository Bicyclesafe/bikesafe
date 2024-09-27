import { useEffect, FC } from "react"
import { useMap } from 'react-leaflet'
import { MousePositionControlProps } from "../types"

const MousePositionControl: FC<MousePositionControlProps> = ({ setCursorPosition }) => {
    const map = useMap()
  
    useEffect(() => {
      const onMouseMove = (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng
        setCursorPosition({ lat, lng })
      }
  
      map.on('mousemove', onMouseMove)
  
      // Cleanup event listener on component unmount
      return () => {
        map.off('mousemove', onMouseMove)
      }
    }, [map, setCursorPosition])
  
    return null
  }

export default MousePositionControl