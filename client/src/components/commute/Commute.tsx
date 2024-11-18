import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import styles from "./Commute.module.css"
import L from "leaflet"
import { useEffect, useRef, useState } from 'react'
import "leaflet-routing-machine"
import CommuteModal from './CommuteModal'

const Commute = () => {
  const mapRef = useRef(null)
  const [routeDistance, setRouteDistance] = useState<number>(0)
	const [routeTime, setRouteTime] = useState<number>(0)
  
  useEffect(() => {
    let RoutingMachineRef: L.Routing.Control
    setTimeout(() => {
      const map = mapRef.current

      if (!map) return
  
      // Set up routing machine after the map is initialized
      RoutingMachineRef = L.Routing.control({
        lineOptions: {
          styles: [
            {
              color: 'red',
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
      RoutingMachineRef.on('routesfound', (e) => {
        const routes = e.routes
        const summary = routes[0].summary

				const distance = parseFloat((summary.totalDistance / 1000).toFixed(2))
				const time = Math.round(summary.totalTime % 3600 / 60)
        setRouteDistance(distance)
				setRouteTime(time)
     })
    }, 0)   

    return () => {
      RoutingMachineRef.remove()
    }
  }, [])

	useEffect(() => {
  }, [routeDistance, routeTime])

  return (
		<div>
      <CommuteModal routeDistance={routeDistance}/>
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
			<div>
				<h2>Route Distance: {routeDistance} km</h2>
			</div>
		</div>
  )
}

export default Commute