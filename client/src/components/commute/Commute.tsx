import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import styles from "./Commute.module.css"
import L from "leaflet"
import { useEffect, useRef } from 'react'
import "leaflet-routing-machine"

const Commute = () => {
  const mapRef = useRef(null)

  useEffect(() => {
    let RoutingMachineRef: L.Routing.Control
    setTimeout(() => {
      const map = mapRef.current
      console.log("after timeout", map)

      if (!map) return

      // Set up routing machine after the map is initialized
      RoutingMachineRef = L.Routing.control({
        lineOptions: {
          styles: [
            {
              color: '#757de8',
            },
          ],
          extendToWaypoints: true,
          missingRouteTolerance: 100
        },
        waypoints: [
          L.latLng(60.1695, 24.9354),
          L.latLng(60.18, 24.91),
        ],
      })
      RoutingMachineRef.addTo(map)

      const routingContainer = document.querySelector('.leaflet-routing-container') as HTMLElement
      if (routingContainer) {
        routingContainer.style.display = 'none'
      }
    }, 0)   

    return () => {
      RoutingMachineRef.remove()
    }
  }, [])

  return (
        <MapContainer 
        center={[60.1695, 24.9354]}
        zoom={13}
        scrollWheelZoom={true}
        id='map'
        className={styles['map-container']}
        preferCanvas={true}
        minZoom={8}
        ref={mapRef}
        >
          <TileLayer
            attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
  )
}

export default Commute