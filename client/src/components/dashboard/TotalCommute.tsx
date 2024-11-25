import { useAuth } from "../../hooks/useAuth"
import { useState } from "react"
import { getTripsForAllUsers } from "../../services/tripService"
import {startOfDay, endOfDay} from "date-fns"


const TotalCommute = () => {
  const [totalTrips, setTotalTrips] = useState<number>(0)
  const { user } = useAuth()

  const fetchData = async () => {
    if (user) {
      const token = await user.getIdToken(true)
      const startTime = startOfDay(new Date())
      const endTime = endOfDay(new Date())
      const tripsResponse = await getTripsForAllUsers(token as string, startTime, endTime)
      console.log(tripsResponse)
      setTotalTrips(tripsResponse)
    }
  }
  fetchData()

  return (
    <div>
      {totalTrips}
    </div>
  )
}

export default TotalCommute