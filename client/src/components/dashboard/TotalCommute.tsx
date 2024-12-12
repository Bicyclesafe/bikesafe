import { useAuth } from "../../hooks/useAuth"
import { useState } from "react"
import { getTripsForAllUsers } from "../../services/tripService"
import {startOfDay, endOfDay} from "date-fns"
import styles from "./TotalCommute.module.css"


const TotalCommute = () => {
  const [totalTrips, setTotalTrips] = useState<number>(0)
  const { user } = useAuth()

  const fetchData = async () => {
    if (user) {
      const token = await user.getIdToken(true)
      const startTime = startOfDay(new Date())
      const endTime = endOfDay(new Date())
      const tripsResponse = await getTripsForAllUsers(token as string, startTime, endTime)
      setTotalTrips(tripsResponse)
    }
  }
  fetchData()

  return (
    <div className={styles['container']} data-testid="commute-count">
      {totalTrips}
    </div>
  )
}

export default TotalCommute