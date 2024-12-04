import { FC } from "react"
import { AchievementType } from "../../types"
import Achievement from "./Achievement"

const AchievementGroup: FC<{achievements: AchievementType[]}> = ({ achievements }) => {
  return (
    achievements.map(achievement => (
      <Achievement achievement={achievement} key={achievement.level}/>
    ))
  )
}

export default AchievementGroup