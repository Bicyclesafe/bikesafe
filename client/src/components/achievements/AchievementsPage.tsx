import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getAchievements } from "../../services/achievementService"
import { AchievementType } from "../../types"
import AchievementGroup from "./AchievementGroup"
import styles from "./Achievement.module.css"

const AchievementsPage = () => {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState<AchievementType[][]>([])

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
      setAchievements(groupAchievements(achievements))
    }
    fetchAchievements()
  }, [user])

  return (
    <div className={styles['grid-container']}>
      {achievements.map(achievementGroup => (
        <AchievementGroup achievements={achievementGroup} key={achievementGroup[0].groupId} />
      ))}
    </div>
  )
}

export default AchievementsPage