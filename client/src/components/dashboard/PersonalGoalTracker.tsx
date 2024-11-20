import { useEffect, useState } from "react"
import { PersonalGoal } from "../../types"
import goalService from "../../services/goalService"
import { useAuth } from "../../hooks/useAuth"
import tripService from "../../services/tripService"
import { ResponsivePie } from '@nivo/pie'
import stylesPersonalGoal from './PersonalGoalTracker.module.css'
import { FC } from "react"

const PersonalGoalTracker:FC<{yearly_distance:number}> = ({yearly_distance}) => {
  const [currentGoals, setCurrentGoals] = useState<PersonalGoal[]>([])
  const [currentProgress, setCurrentProgress] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [personalGoal, setPersonalGoal] = useState<string>("")
  const { user } = useAuth()

  useEffect(() => {
    const fetchGoals = async () => {
      if (user) {
        try {
        const token = await user.getIdToken(true)
        const currentGoalResponse = await goalService.getCurrentGoalsForUser(token as string)
        setCurrentGoals(currentGoalResponse || [])
        } catch (error) {
          console.error('Error fetching goals:', error)
        }
      }
    }
    fetchGoals()
  }, [user?.uid, user])

  useEffect(() => {
    const fetchProgress = async () => {
      if (currentGoals.length > 0 && user) {
        try {
          const token = await user.getIdToken(true)
          const tripsResponse = await tripService.getTripsBetweenDates(
            token,
            currentGoals[0].startTime,
            currentGoals[0].endTime
          )
          setCurrentProgress(tripsResponse || 0)
        } catch (error) {
          console.error('Error fetching progress:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    fetchProgress()
  }, [currentGoals, user, yearly_distance])


  const handlePersonalGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalGoal(event.currentTarget.value)
  }

  const addGoal = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    try {
      if (user) {
        const [monday, sunday] = calculateWeek()
        const token = await user.getIdToken(true)
        const goalNumber = parseInt(personalGoal)
        await goalService.addGoal(token as string, goalNumber, monday, sunday )}
        if (user) {
        const token = await user.getIdToken(true)
        const currentGoalResponse = await goalService.getCurrentGoalsForUser(token as string)
        setCurrentGoals(currentGoalResponse || [])
        }
      } catch (error: unknown) {
      if (error instanceof Error) {
      console.error("Error adding goal: ", error.message)
      }
  }}

  const calculateWeek = () => {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1)

    const monday = new Date(today)
    monday.setDate(diff)
    monday.setHours(0, 0, 0, 0)

    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    sunday.setHours(23, 59, 59, 59)

    return [monday, sunday]
 }

  if (loading) return <div>Loading...</div>
  if (currentGoals.length === 0) return (
  <>
    <div className={stylesPersonalGoal['set-goal-text']}>
      Set a personal goal for the week
    </div> 
    <form onSubmit={addGoal}>
      <input type="number" min="1" value={personalGoal} placeholder="Enter your goal" onChange={handlePersonalGoalChange} />
      <button type="submit" data-testid="set-goal-button">Set</button>
    </form>
  </>
  )

  const data = currentProgress !== null ? [
    { id: 'Completed', value: currentProgress, color: 'hsl(150, 60%, 40%)' },
    { id: 'Remaining', value: Math.max(currentGoals[0].goalDistance - currentProgress, 0), color: 'hsl(0, 0%, 80%)' },
  ] : []
  
  return (
    <div>
      <header>
        Viikkotavoite
      </header>
      <div className={stylesPersonalGoal['progress-text']} data-testid="progress-text">
        {currentProgress || 0} / {currentGoals[0].goalDistance}
      </div>
      <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
        <ResponsivePie
          data={data}
          innerRadius={0.7}
          startAngle={-90}
          endAngle={90}
          padAngle={1}
          cornerRadius={3}
          colors={{ datum: 'data.color' }}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          isInteractive={true}
          legends={[]}
          borderWidth={1}
          motionConfig="stiff"
          borderColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                0.2
              ]
            ]
          }}
         />
      </div>
    </div>
  )
}

export default PersonalGoalTracker
