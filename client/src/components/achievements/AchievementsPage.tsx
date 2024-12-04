import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getAchievements } from "../../services/achievementService"
import { AchievementType } from "../../types"
import AchievementGroup from "./AchievementGroup"

const AchievementsPage = () => {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState<AchievementType[]>([])

  useEffect(() => {
    const fetchAchievements = async () => {
      const token = await user?.getIdToken()
      const achievements = await getAchievements(token as string)
      setAchievements(achievements)
    }
    fetchAchievements()
  }, [user])

  return (
    <div>
      {achievements.map(achievement => (
        <AchievementGroup achievement={achievement} key={achievement.name} />
      ))}
    </div>
  )
}

export default AchievementsPage