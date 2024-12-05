import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getAchievements } from "../../services/achievementService"
import { AchievementData, AchievementType } from "../../types"
import AchievementGroup from "./AchievementGroup"
import styles from "./Achievement.module.css"
import { getTotalDistanceForUser, getTripCountForUser } from "../../services/tripService"

const AchievementsPage = () => {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState<AchievementType[][]>([])
  const [achievementData, setAchievementData] = useState<AchievementData>({
    sumOfTrips: 0,
    tripCount: 0
  })

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
      setAchievements(groupAchievements(achievements))
      setAchievementData({
        sumOfTrips: tripSum,
        tripCount: tripCount
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