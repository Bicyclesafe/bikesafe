import { FC } from "react"
import { PinFilterOption } from "./PinFilterOption"
import { FilterProps } from "../../types"

export const PinFilter: FC<FilterProps> = ({
  filters,
  handleFilterChange
}) => {
  return (
    <div>
      {Object.entries(filters).map(([filterName, { isChecked, label }]) => (
        <PinFilterOption
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