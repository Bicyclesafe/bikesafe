import { FC } from 'react'
import { Filters } from '../../types'
import { PinFilter as Filter } from "../filter/PinFilter"

const StatisticFilters: FC<{ filters: Filters, setFilters:  React.Dispatch<React.SetStateAction<Filters>> }> = ({ filters, setFilters })=> {

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: {
            ...prevFilters[name],
            isChecked: checked
          }
        }))
      }

    return (
        <>
        <div>
            <h2>Filters</h2>
        </div>
        <Filter
          filters={filters}
          handleFilterChange={handleFilterChange}
          />
        </>
    )
}

export default StatisticFilters