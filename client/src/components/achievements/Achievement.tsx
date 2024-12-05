import { FC } from "react"
import { AchievementType } from "../../types"
import styles from "./Achievement.module.css"
import bronze from "../../assets/Bronze.svg"
import silver from "../../assets/Silver.svg"
import gold from "../../assets/Gold.svg"

const Achievement: FC<{achievement: AchievementType, value: number}> = ({ achievement, value }) => {
  const regex = /^\d+\.0$/

  const renderImage = (level: number) => {
    switch(level) {
      case 1:
        return <img src={bronze} />
      case 2:
        return <img src={silver} />
      case 3:
        return <img src={gold} />
      default:
        throw new Error
    }
  }
  
  let newValue = achievement.requirement < value ? achievement.requirement : Number(value.toFixed(1))

  if (regex.test(newValue.toString())) {
    newValue = Math.round(newValue)
  }

  return (
    <div className={styles["achievement"]}>
      {renderImage(achievement.level)}
      <header className={styles["achievement-title"]}>{achievement.name}</header>
      <p>{achievement.description}</p>
      <progress value={value} max={achievement.requirement} color="#555555"/>
      <p id={styles["progress-data"]}>{newValue}/{achievement.requirement}</p>
    </div>
  )
}

export default Achievement