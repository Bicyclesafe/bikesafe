import { FC } from "react"
import { Marker, Popup } from "react-leaflet"
import { PinsProps} from "../../types"
import { pinType } from "../../util/pins"

export const Pins: FC<PinsProps> = ({ pinData, isChecked, typeOfPin, deletePin }) => {
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
            <button onClick={() => deletePin(pin.id)}>DELETE</button>
          </Popup>
        </Marker>
      ))}
    </div>
  )
}