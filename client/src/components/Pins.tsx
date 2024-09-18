import { FC } from "react"
import { Marker, Popup } from "react-leaflet"
import { Coordinate } from "../types"
import L from 'leaflet'

export const Pins: FC<{ coordinates: Coordinate[]}> = ({ coordinates }) => {
  const marker = (color: string) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  return (
    <div>
      {coordinates.map((coordinate) => (
        <Marker
          key={coordinate.id}
          position={[coordinate.lat, coordinate.lng]}
          icon={coordinate.type === 'bikeTheft' ? marker('red') : marker('green') }>
          <Popup>
            Täällä asuu TKT <br />
          </Popup>
        </Marker>
      ))}
    </div>
  )
}