import { FC } from "react"
import { AchievementProps } from "../../types"
import styles from "./Achievement.module.css"

const Achievement: FC<AchievementProps> = ({ name, requirement, level }) => {
  return (
    <div className={styles["achievement"]}>
      {name} {requirement} {level}
    </div>
  )
}

export default Achievement