import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import styles from "./Commute.module.css"
import L from "leaflet"
import { useEffect, useRef, useState } from 'react'
import "leaflet-routing-machine"

const Commute = () => {
  const mapRef = useRef(null)
  const [routeDistance, setRouteDistance] = useState<number>(0)
	const [routeTime, setRouteTime] = useState<number>(0)

	const saveDistance = () => {
		console.log(routeDistance)
	}

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
		console.log("Total distance: " + routeDistance + "km")
		console.log("Total time: " + routeTime + "min")
  }, [routeDistance, routeTime])

  return (
		<div>
			<div className={styles['overlay-container']}>
				<h2>Commute distance: {routeDistance}</h2>
				<button onClick={saveDistance} className={`${styles['base-button']}`} id={styles['theft-button']}>Save Commute</button>
      </div>
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