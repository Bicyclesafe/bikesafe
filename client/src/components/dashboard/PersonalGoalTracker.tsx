import { useEffect, useState } from "react"
import { PersonalGoal } from "../../types"
import goalService from "../../services/goalService"
import { useAuth } from "../../hooks/useAuth"
import tripService from "../../services/tripService"
import { ResponsivePie } from '@nivo/pie'
import stylesPersonalGoal from './PersonalGoalTracker.module.css'

const PersonalGoalTracker = () => {
  const [currentGoals, setCurrentGoals] = useState<PersonalGoal[]>([])
  const [currentProgress, setCurrentProgress] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [personalGoal, setPersonalGoal] = useState<string>("")
  const { user } = useAuth()

  useEffect(() => {
    const fetchGoals = async () => {
      if (user) {
        const token = await user.getIdToken(true)
        const currentGoalResponse = await goalService.getCurrentGoalsForUser(token as string)
        setCurrentGoals(currentGoalResponse || [])
      }
    }
    fetchGoals()
  }, [user?.uid, user])

  useEffect(() => {
    const fetchProgress = async () => {
      if (currentGoals.length > 0 && user?.uid) {
        const token = await user.getIdToken(true)
        const tripsResponse = await tripService.getTripsBetweenDates(
          token as string,
          currentGoals[0].startTime,
          currentGoals[0].endTime
        )
        setCurrentProgress(tripsResponse || 0)
      }
    }
    fetchProgress()
    setLoading(false)
  }, [currentGoals, user])


  const handlePersonalGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalGoal(event.currentTarget.value)
  }

  const addGoal = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (user) {
        const [monday, sunday] = calculateWeek()
        const token = await user.getIdToken(true)
        await goalService.addGoal(token as string, parseInt(personalGoal), monday, sunday )}
    } catch (error: unknown) {
      if (error instanceof Error) {
      console.error(error.message)
      }
  }}}

  const calculateWeek = () => {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1)

    const monday = new Date(today)
    monday.setDate(diff)

    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)

    console.log(monday)
    console.log(sunday)

    return [monday, sunday]

 }

  if (loading) return <div>Loading...</div>
  if (currentGoals.length === 0) return (
  <>
    <div>
      Set a personal goal for the week
    </div> 
    <form onSubmit={addGoal}>
      <input type="text" value={personalGoal} onChange={handlePersonalGoalChange} />
      <button type="submit">Set</button>
    </form>
  </>
  )

  const data = currentProgress !== null ? [
    { id: 'Completed', value: currentProgress, color: 'hsl(150, 60%, 40%)' },
    { id: 'Remaining', value: Math.max(currentGoals[0].goalDistance - currentProgress, 0), color: 'hsl(0, 0%, 80%)' },
  ] : []
  
  return (
    <div style={{ height: 150 }}>
      <header>
        Viikkotavoite
      </header>
      <div className={stylesPersonalGoal['progress-text']}>
        {currentProgress || 0} / {currentGoals[0].goalDistance}
      </div>
        <ResponsivePie
          data={data}
          innerRadius={0.7}
          startAngle={-90}
          endAngle={90}
          cornerRadius={3}
          colors={{ datum: 'data.color' }}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          isInteractive={true}
          legends={[]}
          motionConfig="stiff"
        />
    </div>
  )
}

export default PersonalGoalTracker
