import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import styles from "./Commute.module.css"

const Commute = () => {
  return (
        <MapContainer 
        center={[60.1695, 24.9354]} // Centered on Helsinki
        zoom={13} // Set an appropriate initial zoom level
        scrollWheelZoom={true}
        id='map'
        className={styles['map-container']}
        preferCanvas={true}
        minZoom={8}
        >
        <TileLayer
            attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        </MapContainer>
  )
}

export default Commute