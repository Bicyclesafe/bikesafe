import { FC } from 'react'
import { useMapEvents } from 'react-leaflet'

interface ZoomLevelUpdaterProps {
    setZoomLevel: (zoomLevel: number) => void
  }

const ZoomLevelUpdater: FC<ZoomLevelUpdaterProps> = ({ setZoomLevel }) => {
    useMapEvents({
      zoomend: (event) => {
        setZoomLevel(event.target.getZoom())
      }
    })
    return null
}


export default ZoomLevelUpdater