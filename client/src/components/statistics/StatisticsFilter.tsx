import { FC } from "react"
import { StatisticsFilterOption } from "./StatisticsFilterOptions"
import { FilterProps } from "../../types"

export const StatisticsFilter: FC<FilterProps> = ({
  filters,
  handleFilterChange
}) => {
  return (
    <div>
      {Object.entries(filters).map(([filterName, { isChecked, label }]) => (
        <StatisticsFilterOption
          key={filterName}
          name={filterName}
          isChecked={isChecked}
          onChange={handleFilterChange}
          label={label}
        />
      ))}
    </div>
  )
}

export default StatisticsFilter