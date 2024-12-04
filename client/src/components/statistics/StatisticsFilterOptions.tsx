import { FC } from "react"
import { FilterOptionProps } from "../../types"
import styles from './StatisticsFilters.module.css'

export const StatisticsFilterOption: FC<FilterOptionProps> = ({
  name,
  isChecked,
  onChange,
  label
}) => {
  return (
    <div className={styles[`${name}-filter`]}>
      <label>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={onChange}
          className={styles['checkbox']}
        />
        {label}
      </label>
    </div>
  )
}

export default StatisticsFilterOption