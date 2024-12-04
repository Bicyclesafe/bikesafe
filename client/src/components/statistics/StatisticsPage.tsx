import { useEffect, useState } from "react"
import DistanceBarChart from "./DistanceBarChart"
import { useAuth } from "../../hooks/useAuth"
import { Trip, Filters } from "../../types"
import tripService from "../../services/tripService"
import stylesStatistics from "./StatisticsPage.module.css"
import LatestTrips from "./LatestTrips"
import SummaryStatistics from "./SummaryStatistics"
import StatisticFilters from "./StatisticsFilters"

const initialFilters: Filters = {
    emissionCarPerDate: {
      label: 'Car emissions saved (Daily)',
      isChecked: true,
    },
    emissionCarTotal: {
      label: 'Car emissions saved (Yearly)',
      isChecked: true,
    },
    emissionBusPerDate: {
        label: 'Bus emissions saved (Daily)',
        isChecked: true,
    },
    emissionsBusTotal: {
        label: 'Bus emissions saved (Yearly)',
        isChecked: true,
    },
    fuelCostCarPerDate: {
        label: 'Fuel cost saved (Daily)',
        isChecked: true,
    },
    fuelCostCarTotal: {
        label: 'Fuel cost saved (Yearly)',
        isChecked: true,
    }
  }

const StatisticsPage = () => {
  const { user } = useAuth()
  const [rawData, setRawData] = useState<Trip[]>([])
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())
  const [filters, setFilters] = useState<Filters>(initialFilters)

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
    <div className={stylesStatistics['statistics-container']}>
      <select onChange={(e) => setYear(e.target.value)}>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>
      <div className={stylesStatistics['statistics-content']}>
        <div className={stylesStatistics['chart']}>
            <DistanceBarChart rawData={rawData} year={year} filters={filters}/>
        </div>
        <div className={stylesStatistics['filter-and-trips-containers']}>
          <div>
            <StatisticFilters filters={filters} setFilters={setFilters} />
          </div>
        <div className={stylesStatistics['trip-container']}>
          <LatestTrips rawData={rawData} />
        </div>
        </div>
          <div className={stylesStatistics['summary-container']}>
            <SummaryStatistics rawData={rawData} year={year} />
          </div>
      </div>
    </div>
  )
}

export default StatisticsPage