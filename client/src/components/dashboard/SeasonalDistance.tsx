import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import tripService from "../../services/tripService"
import { SeasonalDistanceProps } from "../../types"
import stylesSeasonalDistance from "./SeasonalDistance.module.css"


const SeasonalDistance = ({ distance, setDistance }: SeasonalDistanceProps) => {
  const { user } = useAuth()

  const year = new Date().getFullYear()
  
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await user.getIdToken(true)
        const startTime = new Date(`${year}-01-01 00:00:00`)
        const endTime = new Date(`${year}-12-31 23:59:59`)
        const distanceResponse = await tripService.getSumOfTripsBetweenDates(token as string, startTime, endTime)
        setDistance(distanceResponse)
      }
    }
    fetchData()
  }, [setDistance, user, user?.uid, year])

  return (
    <div className={stylesSeasonalDistance['total-distance']} id="total-distance">
      {distance?.toFixed(1) || 0}km
    </div>
  )
}

export default SeasonalDistance