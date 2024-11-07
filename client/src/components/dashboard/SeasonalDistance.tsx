import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import tripService from "../../services/tripService"
import stylesSeasonalDistance from './SeasonalDistance.module.css'

const SeasonalDistance = () => {
  const [distance, setDistance] = useState(0)

  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const distanceResponse = await tripService.getTotalDistanceForUser(user?.uid)
      setDistance(distanceResponse)
    }
    fetchData()
  }, [user?.uid])

  const year = new Date().getFullYear()

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