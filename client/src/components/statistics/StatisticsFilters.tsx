import { FC } from 'react'
import { Filters } from '../../types'
import { PinFilter as Filter } from "../filter/PinFilter"
import styles from './StatisticsFilters.module.css'

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
        <div className={styles['filter-box']}>
        <div>
            <h2>Filters</h2>
        </div>
        <Filter
          filters={filters}
          handleFilterChange={handleFilterChange}
          />
        </div>
    )
}

export default StatisticFilters