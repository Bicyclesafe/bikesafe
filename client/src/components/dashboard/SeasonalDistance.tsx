import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import tripService from "../../services/tripService"
import stylesSeasonalDistance from './SeasonalDistance.module.css'
import { SeasonalDistanceProps } from "../../types"

const SeasonalDistance = ({ distance, setDistance }: SeasonalDistanceProps) => {
  const { user } = useAuth()

  const year = new Date().getFullYear()
  
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await user.getIdToken(true)
        const startTime = new Date(`${year}-01-01 00:00:00`)
        const endTime = new Date(`${year}-12-31 23:59:59`)
        const distanceResponse = await tripService.getTripsBetweenDates(token as string, startTime, endTime)
        setDistance(distanceResponse)
      }
    }
    fetchData()
  }, [user, user?.uid, year])

  return (
    <div className={stylesSeasonalDistance['seasonal-distance-container']}>
      <div className={stylesSeasonalDistance['year']}>
        {year}
      </div>
      <div className={stylesSeasonalDistance['distance']}>
        {distance || 0}km
      </div>
    </div>
  )
}

export default SeasonalDistance