import { FC } from "react"
import { AchievementType } from "../../types"
import Achievement from "./Achievement"

const AchievementGroup: FC<{achievement: AchievementType}> = ({ achievement }) => {
  return (
    achievement.requirements.map((requirement, index) => (
      <Achievement name={achievement.name} requirement={requirement} level={index} key={index}/>
    ))
  )
}

export default AchievementGroup