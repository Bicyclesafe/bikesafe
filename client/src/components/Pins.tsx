import { FC } from "react"
import { Marker, Popup } from "react-leaflet"
import { Pin } from "../types"
import L from 'leaflet'

export const Pins: FC<{ pinData: Pin[], isChecked: boolean, typeOfPin: string}> = ({ pinData, isChecked, typeOfPin }) => {
  if (!isChecked) return null

  const getPinColor = (type: string) => {
    switch(type) {
      case 'bikeTheft':
        return 'red'
      case 'lockStation':
        return 'green'
      default:
        return 'blue'
    }
  }

  const pinType = (type: string) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${getPinColor(type)}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  return (
    <div>
      {pinData.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.coordinate.lat, pin.coordinate.lng]}
          icon={pinType(typeOfPin)}>
          <Popup>
            Täällä asuu TKT <br />
          </Popup>
        </Marker>
      ))}
    </div>
  )
}