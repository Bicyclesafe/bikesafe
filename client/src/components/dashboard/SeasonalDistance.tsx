import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import tripService from "../../services/tripService"
import stylesSeasonalDistance from './SeasonalDistance.module.css'

const SeasonalDistance = () => {
  const [distance, setDistance] = useState(0)
  const { user } = useAuth()

  const year = new Date().getFullYear()
  
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await user.getIdToken(true)
        const distanceResponse = await tripService.getYearlyDistanceForUser(token as string, year.toString())
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