import { useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { addTrip } from '../../services/tripService'
import { TripProps } from '../../types'
import { useAuth } from '../../hooks/useAuth'

const ManualTrips = () => {
    const [distance, setDistance] = useState<number>(0)
    const [date, setDate] = useState<Date | null>(new Date())
    const [startTime, setStartTime] = useState<Date | null>(new Date())
    const [endTime, setEndTime] = useState<Date | null>(new Date())
    const { user } = useAuth()

    const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDistance(Number(event.currentTarget.value))
      }

    const manualAddTrip = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (user && distance && date && startTime && endTime) {
            const token = await user.getIdToken(true)
            const trip: TripProps = {
                tripDistance: distance,
                startTime: startTime,
                endTime: endTime
            }
            const response = await addTrip(token as string, trip)
            console.log(response)
        }
        }

    return (
        <div>
            <form onSubmit={manualAddTrip}>
                <input type="number" min="0" value={distance} onChange={handleDistanceChange} />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker 
                value={date}
                onChange={(newValue) => setDate(newValue)}/>
                <TimePicker
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                />
                <TimePicker
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                />
            </LocalizationProvider>
            <button type="submit">Add trip</button>
            </form>
        </div>
    )   
}

export default ManualTrips