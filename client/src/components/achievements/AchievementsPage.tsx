import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getAchievements } from "../../services/achievementService"
import { AchievementData, AchievementType, AllTripsProps } from "../../types"
import AchievementGroup from "./AchievementGroup"
import styles from "./Achievement.module.css"
import { getAllTrips, getTotalDistanceForUser, getTripCountForUser } from "../../services/tripService"

const AchievementsPage = () => {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState<AchievementType[][]>([])
  const [achievementData, setAchievementData] = useState<AchievementData>({
    sumOfTrips: 0,
    tripCount: 0,
    consecutiveCount: 0
  })

  const parseAllTrips = (allTrips: AllTripsProps[]) => {
    const sortedTrips = allTrips.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())

    let streakCount = 1
    let maxStreak = 1
    let previousDate = new Date(sortedTrips[0].startTime).toISOString().split('T')[0]

    for (let i = 1; i < sortedTrips.length; i++) {
      const currentDate = new Date(sortedTrips[i].startTime).toISOString().split('T')[0] 
  
      const dayDifference = (new Date(currentDate).getTime() - new Date(previousDate).getTime()) / (1000 * 3600 * 24) 
  
      if (dayDifference === 1) {
        streakCount++
      } else if (dayDifference > 1) {
        maxStreak = Math.max(maxStreak, streakCount)  
        streakCount = 1 
      }
  
      previousDate = currentDate 
    }
    maxStreak = Math.max(maxStreak, streakCount)
    return maxStreak
  }

  const groupAchievements = (achievements: AchievementType[]) => {
    const groupedAchievements = achievements.reduce((accumulator:{[key: number]: AchievementType[]}, current: AchievementType) => {
      if (!accumulator[current.groupId]) {
        accumulator[current.groupId] = []
      }
      accumulator[current.groupId].push(current)
      return accumulator
    }, {})

    return Object.values(groupedAchievements)
  }

  useEffect(() => {
    const fetchAchievements = async () => {
      const token = await user?.getIdToken()
      const achievements = await getAchievements(token as string)
      const tripSum = await getTotalDistanceForUser(token as string)
      const tripCount = await getTripCountForUser(token as string)
      const allTrips = await getAllTrips(token as string)
      const parsedTrips = parseAllTrips(allTrips)

      setAchievements(groupAchievements(achievements))
      setAchievementData({
        sumOfTrips: tripSum,
        tripCount: tripCount,
        consecutiveCount: parsedTrips
      })
    }
    fetchAchievements()
  }, [user])

  return (
    <div className={styles['grid-container']}>
      {achievements.map(achievementGroup => (
        <AchievementGroup achievements={achievementGroup} achievementData={achievementData} key={achievementGroup[0].groupId} />
      ))}
    </div>
  )
}

export default AchievementsPage