import { useState, useEffect } from 'react'
import { CompanyStatistics } from '../../../types'

const useStatisticsData = (statistics: CompanyStatistics | null, selectedDate: Date | null) => {
  const [data, setData] = useState({
    currentMonthDistance: 0,
    previousMonthDistance: 0,
    currentMonthCyclists: 0,
    previousMonthCyclists: 0,
    currentCO2: 900,
    previousCO2: 800,
  })
  
  useEffect(() => {
    if (!selectedDate || !statistics) {
      return
    }

    const currentMonthIndex = selectedDate?.getMonth()
    
    const currentMonthDistance = statistics?.distancesByMonth[currentMonthIndex]?.distance || 0
    const previousMonthDistance = statistics?.distancesByMonth[currentMonthIndex - 1]?.distance || 0
    
    const currentMonthCyclists = statistics?.activeCyclistsByMonth[currentMonthIndex]?.activeCyclists || 0
    const previousMonthCyclists = statistics?.activeCyclistsByMonth[currentMonthIndex - 1]?.activeCyclists || 0
    
    const currentCO2 = 900
    const previousCO2 = 800
    
    setData({
      currentMonthDistance,
      previousMonthDistance,
      currentMonthCyclists,
      previousMonthCyclists,
      currentCO2,
      previousCO2,
    })
  }, [statistics, selectedDate])
  
  return data
}

export default useStatisticsData
