import { FC } from "react"
import { Marker, Popup } from "react-leaflet"
import { BikeTheft, Coordinate} from "../types"
import { pinType } from "../util/pins"
import { deleteTheft } from "../services/theftService"

export const Pins: FC<{ pinData: Coordinate[], isChecked: boolean, typeOfPin: string, bikeTheft?:BikeTheft[], setBikeTheft?:React.Dispatch<React.SetStateAction<BikeTheft[]>>  }> = ({ pinData, isChecked, typeOfPin, bikeTheft, setBikeTheft }) => {
  if (!isChecked) return null

  const deleteTheftMarker = (id: number) => {
    console.log('hello')
    deleteTheft(id)
     if (bikeTheft && setBikeTheft) {
    setBikeTheft(
      bikeTheft.filter(a => (
        a.id !== id
  ))
    )} 
  }

  return (
    <div>
      {pinData.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.lat, pin.lng]}
          icon={pinType(typeOfPin)}>
          <Popup>
            Täällä asuu TKT <br />
            <button onClick={() => deleteTheftMarker(pin.id)}>DELETE</button>
          </Popup>
        </Marker>
      ))}
    </div>
  )
}