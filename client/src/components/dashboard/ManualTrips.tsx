import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addTrip } from '../../services/tripService'
import { ManualTripsProps, TripProps } from '../../types'
import { useAuth } from '../../hooks/useAuth'
import styles from './ManualTrips.module.css'
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns'

const ManualTrips = ({ distance, setDistance }: ManualTripsProps) => {
  const [formDistance, setFormDistance] = useState<string>("")
  const [date, setDate] = useState<Date | null>(null)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const { user } = useAuth()

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormDistance(event.currentTarget.value)
  }

  const manualAddTrip = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (user && formDistance && date && startTime && endTime) {
      const token = await user.getIdToken(true)
      let trueStartTime = date
      trueStartTime = setHours(trueStartTime, getHours(startTime))
      trueStartTime = setMinutes(trueStartTime, getMinutes(startTime))
      let trueEndTime = date
      trueEndTime = setHours(trueEndTime, getHours(endTime))
      trueEndTime = setMinutes(trueEndTime, getMinutes(endTime))
      const trip: TripProps = {
          tripDistance: Number(formDistance),
          startTime: trueStartTime,
          endTime: trueEndTime
      }
      await addTrip(token as string, trip)
      setDistance(Number(formDistance) + distance)
    }
  }

  return (
    <div>
      <form data-testid="form" className={styles['form']} onSubmit={manualAddTrip}>
        <header data-testid="header">Add trip</header>
        <input 
          type="number"
          value={formDistance}
          onChange={handleDistanceChange}
          placeholder="Distance"
          min="0"
          className={styles['input']}
        />
        <DatePicker 
          selected={date}
          onChange={(newValue) => setDate(newValue)}
          placeholderText="Select a date"
          className={styles['input']}
        />
        <DatePicker
          selected={startTime}
          onChange={(newValue) => setStartTime(newValue)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Start Time"
          dateFormat="h:mm aa"
          placeholderText="Select start time"
          className={styles['input']}
        />
        <DatePicker
          selected={endTime}
          onChange={(newValue) => setEndTime(newValue)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="End Time"
          dateFormat="h:mm aa"
          placeholderText="Select end time"
          className={styles['input']}
        />
        <button className={styles['button']} type="submit" data-testid="submit_button">Add trip</button>
      </form>
    </div>
  )
}

export default ManualTrips
