import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import tripService from "../../services/tripService.tsx"

const SeasonalDistance = () => {
  const [distance, setDistance] = useState(0)
  const { user } = useAuth()
  
  useEffect(() => {
    const fetchData = async () => {
      const token = await user?.getIdToken(true)
      const distanceResponse = await tripService.getTotalDistanceForUser(user?.uid, token as string)
      setDistance(distanceResponse)
    }
    fetchData()
  }, [user, user?.uid])

  const year = new Date().getFullYear()

  return (
    <div>
      {distance || 0}km / {year}
    </div>
  )
}

export default SeasonalDistance