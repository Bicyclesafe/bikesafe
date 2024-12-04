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
      label: 'Emissions saved compared to a Car',
      isChecked: true,
    },
    emissionCarTotal: {
      label: 'Total emissions saved in a year compared to a Car',
      isChecked: true,
    },
    emissionBusPerDate: {
        label: 'Emissions saved compared to a Bus',
        isChecked: true,
    },
    emissionsBusTotal: {
        label: 'Total emissions saved in a year compared to a Bus',
        isChecked: true,
    },
    fuelCostCarPerDate: {
        label: 'Money saved on fuel',
        isChecked: true,
    },
    fuelCostCarTotal: {
        label: 'Total money saved on fuel in a year',
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