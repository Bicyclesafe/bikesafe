import { useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { addTrip } from '../../services/tripService'
import { ManualTripsProps, TripProps } from '../../types'
import { useAuth } from '../../hooks/useAuth'
import styles from './ManualTrips.module.css'
import { TextField} from '@mui/material'
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
            <button className={styles['button']} type="submit" data-testid="submit_button">Add trip</button>
            </form>
        </div>
    )   
}

export default ManualTrips