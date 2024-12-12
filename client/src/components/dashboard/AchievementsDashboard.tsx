import styles from "./AchievemtnsDashboard.module.css"
import bronze from "../../assets/Bronze.svg"
import silver from "../../assets/Silver.svg"
import gold from "../../assets/Gold.svg"
import { IconButton } from "@mui/material"
import { KeyboardArrowRight } from "@mui/icons-material"


const AchievementsDashboard = () => {
  return (
    <div>
      <IconButton
        style={{
          position: "absolute",
          top: "0.8rem",
          right: "0.5rem",
          zIndex: 10,
        }}
      >
        <KeyboardArrowRight />
      </IconButton>
        <header className={styles['header']}>Achievements</header>
        <div className={styles['icon-container']}>
          <img src={silver} className={styles['silver-bronze']}/>
          <img src={bronze} className={styles['silver-bronze']}/>
        </div>
        <div className={styles['container']}>
          <img src={gold} className={styles['gold']}/>
        </div>
    </div>
    )
}

export default AchievementsDashboard