import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

interface YearMonthPickerProps {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
}

const YearMonthPicker: React.FC<YearMonthPickerProps> = ({ value, onChange }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker 
        label={'Month and Year'}
        views={['month', 'year']}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  )
}

export default YearMonthPicker