import { FC } from "react"
import { AchievementProps } from "../../types"
import styles from "./Achievement.module.css"
import bronze from "../../assets/Bronze.svg"
import silver from "../../assets/Silver.svg"
import gold from "../../assets/Gold.svg"

const Achievement: FC<AchievementProps> = ({ name, requirement, level }) => {
  const renderImage = (level: number) => {
    switch(level) {
      case 0:
        return <img src={bronze} />
      case 1:
        return <img src={silver} />
      case 2:
        return <img src={gold} />
      default:
        throw new Error
    }
  }

  return (
    <div className={styles["achievement"]}>
      {renderImage(level)}
      <header className={styles["achievement-title"]}>{name} {requirement}</header>      
    </div>
  )
}

export default Achievement