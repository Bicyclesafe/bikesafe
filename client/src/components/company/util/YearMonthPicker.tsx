import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { addMonths, subMonths } from 'date-fns'
import { IconButton } from '@mui/material'

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

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <IconButton onClick={handlePreviousMonth} aria-label="Previous Month">
        <ArrowBack />
      </IconButton>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker 
          label={'Month and Year'}
          views={['month', 'year']}
          value={value}
          onChange={onChange}
        />
      </LocalizationProvider>

      <IconButton onClick={handleNextMonth} aria-label="Next Month">
        <ArrowForward />
      </IconButton>
    </div>
  )
}

export default YearMonthPicker