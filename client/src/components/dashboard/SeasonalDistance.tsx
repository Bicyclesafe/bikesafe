import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import tripService from "../../services/tripService"

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
    <div>
      {distance || 0}km / {year}
    </div>
  )
}

export default SeasonalDistance