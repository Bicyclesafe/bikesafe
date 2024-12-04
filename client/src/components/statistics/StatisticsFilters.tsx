import { FC, useState } from 'react'
import { Filters } from '../../types'
import { StatisticsFilter as Filter } from "./StatisticsFilter"
import styles from './StatisticsFilters.module.css'
import dropdown_icon from '../../assets/down-chevron.png'

const StatisticFilters: FC<{ filters: Filters, setFilters:  React.Dispatch<React.SetStateAction<Filters>>, showFilters: boolean, setShowFilters:  React.Dispatch<React.SetStateAction<boolean>>  }> = ({ filters, setFilters, showFilters, setShowFilters })=> {
  const [isRotated, setIsRotated] = useState(true)

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

    const handleButtonClick = () => {
      setShowFilters(!showFilters)
      setIsRotated(!isRotated)
    }

    return (
        <div className={styles['filter-box']}>
          <div className={styles['filter-title-container']}>
            <div className={styles['filter-title']}>
                Filters
            </div>
            <div className={styles['button-container']}>
            <button
                className={styles['filter-button']}
                onClick={handleButtonClick}
                >
                  <img
                  className={`${styles.filterIcon} ${isRotated ? styles.rotated : ''}`}
                  src={dropdown_icon}
                  ></img>
                </button>
            </div>
          </div>
          {showFilters &&
          <div>
            <Filter
              filters={filters}
              handleFilterChange={handleFilterChange}
              />
          </div>
          }
        </div>
    )
}

export default StatisticFilters