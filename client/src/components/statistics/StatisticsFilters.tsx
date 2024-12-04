import { FC } from 'react'
import { Filters } from '../../types'
import { StatisticsFilter as Filter } from "./StatisticsFilter"
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
          <div className={styles['filter-title']}>
              Filters
          </div>
          <div>
            <Filter
              filters={filters}
              handleFilterChange={handleFilterChange}
              />
          </div>
        </div>
    )
}

export default StatisticFilters