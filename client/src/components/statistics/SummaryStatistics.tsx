import { FC } from "react"
import { Statistic as StatisticType, StatsDataProps, Trip } from "../../types"
import stylesSummary from "./SummaryStatistics.module.css"
import { StyledDuration } from "./LatestTrips"
import useSummaryStatistics from "./hooks/useSummaryStatistics"
import { Duration } from "date-fns"
import statistics, { typeToIcon } from "./statistics"

const Statistic: FC<StatisticType> = ({ title, value, unit, type }) => {
  const renderValue = () => {
    if (typeof value === "object" && type === "duration") {
      return <div><StyledDuration duration={value as Duration} /></div>
    }

    return (
      <div className={stylesSummary['value-wrapper']}>
        <span className={stylesSummary["value"]}>{Number((value as number).toFixed(1))}</span>
        <span className={stylesSummary["unit"]}>{unit}</span>
      </div>
    )
  }
  
  return (
    <div className={stylesSummary[`${type}-box`]}>
      {/* Contribution text for the icons. Not in use yet. */}
      {/* <a href="https://iconscout.com/icons/bicycle" class="text-underline font-size-sm" target="_blank">Bicycle</a> by <a href="https://iconscout.com/contributors/font-awesome" class="text-underline font-size-sm" target="_blank">Font Awesome</a> */}
      {/* <a href="https://iconscout.com/icons/timer" class="text-underline font-size-sm" target="_blank">Timer</a> by <a href="https://iconscout.com/contributors/taras-shypka" class="text-underline font-size-sm" target="_blank">Taras Shypka</a> */}
      <img src={typeToIcon[type]}/>
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
  const statsData: StatsDataProps | null = useSummaryStatistics(rawData, year)
  const stats: StatisticType[] | null = statistics(statsData)

  if (!stats) {
    return <div>Loading...</div>
  }

  return (
    <div className={stylesSummary["summary-box"]}>
      {stats.map((stat, index) => (
        <Statistic key={index} {...stat} />
      ))}
    </div>
  )
}

export default SummaryStatistics