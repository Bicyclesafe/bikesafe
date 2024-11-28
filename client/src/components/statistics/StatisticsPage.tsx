import { useEffect, useState } from "react"
import DistanceBarChart from "./DistanceBarChart"
import { useAuth } from "../../hooks/useAuth"
import { Trip } from "../../types"
import tripService from "../../services/tripService"

const StatisticsPage = () => {
  const { user } = useAuth()
  const [rawData, setRawData] = useState<Trip[]>([])
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        const token = await user.getIdToken(true)
        const trips = await tripService.getAllTrips(token as string)
        setRawData(trips)
      } catch (error) {
        console.error('Error fetching trip data:', error)
      }
    }
    fetchData()
  }, [user])

  return (
      <div>
        <select onChange={(e) => setYear(e.target.value)}>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <DistanceBarChart rawData={rawData} year={year} />
      </div>
  )
}

export default StatisticsPage