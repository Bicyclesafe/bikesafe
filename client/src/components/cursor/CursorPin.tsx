import { FC } from "react"
import { Marker } from "react-leaflet"
import { pinType } from "../../util/pins"

const bikeTheftIcon = pinType('bikeTheft')

const CursorPin: FC<{ position?: { lat: number, lng: number } }> = ({ position }) => {
  return (
    <Marker
      position={[position?.lat || 0, position?.lng || 0]}
      icon={bikeTheftIcon}
    />
  )
}

export default CursorPin