import { FC, useEffect, useState } from "react"
import { AchievementGroupProps } from "../../types"
import Achievement from "./Achievement"

const AchievementGroup: FC<AchievementGroupProps> = ({ achievements, achievementData }) => {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    switch (achievements[0].groupId) {
      case 1:
        setValue(achievementData.sumOfTrips !== null ? achievementData.sumOfTrips : 0)
        break
      case 2:
        setValue(achievementData.longestTrip !== null ? achievementData.longestTrip : 0)
        break
      default:
        throw new Error
    }
  }, [achievementData, achievements])
  console.log(value)
  return (
    achievements.map(achievement => (
      <Achievement achievement={achievement} value={value} key={achievement.level}/>
    ))
  )
}

export default AchievementGroup