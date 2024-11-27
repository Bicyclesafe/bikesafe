import { FC } from "react"
import { Trip } from "../../types"
import stylesSummary from "./SummaryStatistics.module.css"
import { StyledDuration } from "./LatestTrips"
import useSummaryStatistics from "./hooks/useSummaryStatistics"
import { Duration } from "date-fns"
import statistics from "./statistics"

interface StatisticProps {
  title: React.ReactNode
  value: number | Duration
  unit: string
  icon: string
  type: "distance" | "duration" | "emission"
}

const Statistic: FC<StatisticProps> = ({ title, value, unit, icon, type }) => {
  const renderValue = () => {
    if (type === "duration") {
      return <div><StyledDuration duration={value as Duration} /></div>
    }

    return (
      <div className={stylesSummary['value-wrapper']}>
          <span className={stylesSummary["value"]}>{value as number}</span>
          <span className={stylesSummary["unit"]}>{unit}</span>
      </div>
    )
  }
  
  return (
    <div className={stylesSummary[`${type}-box`]}>
      {/* Contribution text for the icons. Not in use yet. */}
      {/* <a href="https://iconscout.com/icons/bicycle" class="text-underline font-size-sm" target="_blank">Bicycle</a> by <a href="https://iconscout.com/contributors/font-awesome" class="text-underline font-size-sm" target="_blank">Font Awesome</a> */}
      {/* <a href="https://iconscout.com/icons/timer" class="text-underline font-size-sm" target="_blank">Timer</a> by <a href="https://iconscout.com/contributors/taras-shypka" class="text-underline font-size-sm" target="_blank">Taras Shypka</a> */}
      <img src={icon}/>
      <div className={stylesSummary['statistic-content']}>
        <div className={stylesSummary['title']}>{title}</div>
        <div className={stylesSummary['value-wrapper']}>
          {renderValue()}
        </div>
      </div>
    </div>
  )
}

const SummaryStatistics: FC<{ rawData: Trip[], year: string }> = ({ rawData, year })=> {
  const statsData = useSummaryStatistics(rawData, year)
  const stats = statistics(statsData)

  return (
    <div className={stylesSummary["summary-box"]}>
      {stats.map((stat, index) => (
        <Statistic key={index} {...stat} />
      ))}
    </div>
  )
}

export default SummaryStatistics