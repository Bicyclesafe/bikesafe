import styles from "./AchievemtnsDashboard.module.css"
import bronze from "../../assets/Bronze.svg"
import silver from "../../assets/Silver.svg"
import gold from "../../assets/Gold.svg"


const AchievementsDashboard = () => {
  return (
    <div>
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