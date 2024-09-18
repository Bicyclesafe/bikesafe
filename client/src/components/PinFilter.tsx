import { FC } from "react"
import { PinFilterOption } from "./PinFilterOption"
import { PinFilterProps } from "../types"

export const PinFilter: FC<PinFilterProps> = ({
  filters,
  handleFilterChange
}) => {
  return (
    <>
      {Object.keys(filters).map((filter) => (
        <PinFilterOption
          key={filter}
          name={filter}
          isChecked={filters[filter].isChecked}
          onChange={handleFilterChange}
          label={filters[filter].label}
        />
      ))}
    </>
  )
}