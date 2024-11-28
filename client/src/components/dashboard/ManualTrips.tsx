import { useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { addTrip } from '../../services/tripService'
import { ManualTripsProps, TripProps } from '../../types'
import { useAuth } from '../../hooks/useAuth'
import styles from './ManualTrips.module.css'
import { TextField} from '@mui/material'


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
            const trip: TripProps = {
                tripDistance: Number(formDistance),
                startTime: startTime,
                endTime: endTime
            }
            await addTrip(token as string, trip)
            setDistance(Number(formDistance) + distance)
        }
        }

    return (
        <div>
            <form className={styles['form']} onSubmit={manualAddTrip}>
                <header>Add trip</header>
                <TextField 
                    label={"Distance"}
                    value={formDistance}
                    onChange={handleDistanceChange}
                    type='number'
                    slotProps={{
                      htmlInput: {
                        min: 0,
                      }
                    }}
                />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker 
                label={"Date"}
                value={date}
                onChange={(newValue) => setDate(newValue)}/>
                <TimePicker
                label={"Start time"}
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                />
                <TimePicker
                label={"End time"}
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                />
            </LocalizationProvider>
            <button className={styles['button']} type="submit">Add trip</button>
            </form>
        </div>
    )   
}

export default ManualTrips