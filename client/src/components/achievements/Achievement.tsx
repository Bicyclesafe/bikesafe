import { FC } from "react"
import { AchievementType } from "../../types"
import styles from "./Achievement.module.css"
import bronze from "../../assets/Bronze.svg"
import silver from "../../assets/Silver.svg"
import gold from "../../assets/Gold.svg"

const Achievement: FC<{achievement: AchievementType}> = ({ achievement }) => {
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

  return (
    <div className={styles["achievement"]}>
      {renderImage(achievement.level)}
      <header className={styles["achievement-title"]}>{achievement.name}</header>
      {achievement.description}
    </div>
  )
}

export default Achievement