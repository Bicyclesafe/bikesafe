import { FC, useEffect, useState } from "react"
import { AchievementGroupProps } from "../../types"
import Achievement from "./Achievement"
import { emissionsCarPerKM, fuelCostCarPerKM } from '../statistics/constants'

const AchievementGroup: FC<AchievementGroupProps> = ({ achievements, achievementData }) => {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    switch (achievements[0].groupId) {
      case 1:
        setValue(achievementData.sumOfTrips !== null ? achievementData.sumOfTrips : 0)
        break
      case 2:
        if (achievementData.sumOfTrips !== null ) {
          setValue(achievementData.sumOfTrips * emissionsCarPerKM)
        }
        break
      case 3:
        if (achievementData.sumOfTrips !== null ) {
          setValue(achievementData.sumOfTrips * fuelCostCarPerKM)
        }
        break
      case 4:
        setValue(achievementData.tripCount !== null ? achievementData.tripCount : 0)
        break
      case 5:
        setValue(achievementData.consecutiveCount !== null ? achievementData.consecutiveCount : 0)
        break
      default:
        throw new Error
    }
  }, [achievementData, achievements])
  
  return (
    achievements.map(achievement => (
      <Achievement achievement={achievement} value={value} key={achievement.level}/>
    ))
  )
}

export default AchievementGroup