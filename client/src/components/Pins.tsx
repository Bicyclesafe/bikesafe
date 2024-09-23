import { FC } from "react"
import { Marker, Popup } from "react-leaflet"
import { BikeTheft } from "../types"
import L from 'leaflet'

export const Pins: FC<{ bikeThefts: BikeTheft[], isChecked: boolean}> = ({ bikeThefts, isChecked }) => {
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
      {bikeThefts.map((theft) => (
        <Marker
          key={theft.id}
          position={[theft.coordinate.lat, theft.coordinate.lng]}
          icon={pinType('bikeTheft')}>
          <Popup>
            Täällä asuu TKT <br />
          </Popup>
        </Marker>
      ))}
    </div>
  )
}