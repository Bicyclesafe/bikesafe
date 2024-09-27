import { FC } from "react"
import { Marker, Popup } from "react-leaflet"
import { Coordinate} from "../types"
import { pinType } from "../util/pins"

export const Pins: FC<{ pinData: Coordinate[], isChecked: boolean, typeOfPin: string}> = ({ pinData, isChecked, typeOfPin }) => {
  if (!isChecked) return null

  return (
    <div>
      {pinData.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.lat, pin.lng]}
          icon={pinType(typeOfPin)}>
          <Popup>
            Täällä asuu TKT <br />
          </Popup>
        </Marker>
      ))}
    </div>
  )
}