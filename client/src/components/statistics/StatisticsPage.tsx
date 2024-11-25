import DistanceBarChart from "./DistanceBarChart"
import stylesStatistics from "./StatisticsPage.module.css"

const StatisticsPage = () => {
  return (
    <div className={stylesStatistics['statistics-container']}>
      <div className={stylesStatistics['statistics-content']}>
        <div className={stylesStatistics['chart']}>
            <DistanceBarChart/>
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage