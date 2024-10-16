import { FC } from "react"
import { PinFilterOption } from "./PinFilterOption"
import { PinFilterProps } from "../../types"

export const PinFilter: FC<PinFilterProps> = ({
  filters,
  handleFilterChange
}) => {
  return (
    <>
    {Object.entries(filters).map(([filterName, { isChecked, label }]) => (
      <PinFilterOption
        key={filterName}
        name={filterName}
        isChecked={isChecked}
        onChange={handleFilterChange}
        label={label}
      />
    ))}
    </>
  )
}