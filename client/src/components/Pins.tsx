import { FC } from "react"
import { Marker, Popup } from "react-leaflet"
import { Coordinate } from "../types"

export const Pins: FC<{ coordinates: Coordinate[]}> = ({ coordinates }) => {
  return (
    <div>
      {coordinates.map((coordinate) => (
        <Marker key={coordinate.id} position={[coordinate.lat, coordinate.lng]}>
          <Popup>
            Täällä asuu TKT <br />
          </Popup>
        </Marker>
      ))}
    </div>
  )
}