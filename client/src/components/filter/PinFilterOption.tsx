import { FC } from "react"
import { PinFilterOptionProps } from "../../types"

export const PinFilterOption: FC<PinFilterOptionProps> = ({
  name,
  isChecked,
  onChange,
  label
}) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  )
}