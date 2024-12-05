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
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={onChange}
          className={styles['checkbox']}
          aria-label={label}
        />
        <label htmlFor={name} className={styles["label"]}>
            {label}
        </label>
    </div>
  )
}

export default StatisticsFilterOption