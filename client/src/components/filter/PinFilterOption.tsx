import { FC } from "react"
import { FilterOptionProps } from "../../types"
//import styles from './PinFilter.module.css'

export const PinFilterOption: FC<FilterOptionProps> = ({
  name,
  isChecked,
  onChange,
  label
}) => {
  return (
    <div /*className={styles['filter-element']}*/>
      <label>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={onChange}
          style={{ marginRight: '6px' }}
        />
        {label}
      </label>
    </div>
  )
}