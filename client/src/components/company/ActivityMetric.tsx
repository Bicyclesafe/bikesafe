import stylesCompany from "./CompanyPage.module.css"

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

const ActivityMetric = ({
  title,
  currentValue,
  previousValue,
  unit,
}: {
  title: string;
  currentValue: number;
  previousValue: number;
  unit: string;
}) => (
  <>
    <div className={stylesCompany['activity-title']}>{title}</div>
    <div className={stylesCompany['activity-value']}>
      {currentValue || 0}
      <span className={stylesCompany['unit']}>{unit}</span>
    </div>
    <div className={stylesCompany['activity-change']}>
      {renderChange(currentValue, previousValue)}
    </div>
  </>
)

export default ActivityMetric