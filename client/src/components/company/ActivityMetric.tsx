import { FC } from "react"
import stylesCompany from "./CompanyPage.module.css"

interface ActivityMetricProps {
  title: string
  currentValue: number
  previousValue: number
  unit: string
}

const renderChange = (currentValue: number, previousValue: number) => {
  if (previousValue === 0) {
    return <div>No previous month</div>
  }

  const change = ((currentValue - previousValue) / previousValue) * 100
  const changeColor = change >= 0 ? 'green' : 'red'

  return (
    <div className={`${stylesCompany['activity-change']} ${stylesCompany[changeColor]}`}>
      {change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`}
    </div>
  )
}

const ActivityMetric: FC<ActivityMetricProps> = ({
  title,
  currentValue,
  previousValue,
  unit,
}) => (
  <>
    <div className={stylesCompany['activity-title']}>{title}</div>
    <div className={stylesCompany['activity-value']}>
      {Number(currentValue.toFixed(1)) || 0}
      <span className={stylesCompany['unit']}>{unit}</span>
    </div>
    <div className={stylesCompany['activity-change']}>
      {renderChange(currentValue, previousValue)}
    </div>
  </>
)

export default ActivityMetric