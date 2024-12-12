import React from 'react'
import DatePicker from 'react-datepicker'
import { addMonths, subMonths } from 'date-fns'

interface YearMonthPickerProps {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
}

const YearMonthPicker: React.FC<YearMonthPickerProps> = ({ value, onChange }) => {
  const handlePreviousMonth = () => {
    if (value) {
      onChange(subMonths(value, 1))
    }
  }

  const handleNextMonth = () => {
    if (value) {
      onChange(addMonths(value, 1))
    }
  }

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
  }: {
    date: Date;
    decreaseMonth: () => void;
    increaseMonth: () => void;
  }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
      <button onClick={decreaseMonth} aria-label="Previous Month">
        ◀
      </button>
      <span>{`${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`}</span>
      <button onClick={increaseMonth} aria-label="Next Month">
        ▶
      </button>
    </div>
  )

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <button onClick={handlePreviousMonth} aria-label="Previous Month">
        ◀
      </button>

      <DatePicker
        selected={value}
        onChange={(date) => onChange(date as Date | null)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        renderCustomHeader={renderCustomHeader}
      />

      <button onClick={handleNextMonth} aria-label="Next Month">
        ▶
      </button>
    </div>
  )
}

export default YearMonthPicker