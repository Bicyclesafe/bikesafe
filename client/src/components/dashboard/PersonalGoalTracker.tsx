import { useEffect, useState } from "react"
import { PersonalGoal } from "../../types"
import goalService from "../../services/goalService"
import { useAuth } from "../../hooks/useAuth"
import tripService from "../../services/tripService"
import { ResponsivePie } from '@nivo/pie'
import stylesPersonalGoal from './PersonalGoalTracker.module.css'
import { linearGradientDef } from "@nivo/core"
import { FC } from "react"

const PersonalGoalTracker:FC<{ yearlyDistance: number }> = ({ yearlyDistance = [] }) => {
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
          const tripsResponse = await tripService.getSumOfTripsBetweenDates(
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
  }, [currentGoals, user, yearlyDistance])


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

  const completedPieColor = (currentProgress ?? 0) >= (currentGoals?.[0]?.goalDistance ?? 0)
    ? "gradientFull"
    : "gradientCompleted"

  if (loading) return <div>Loading...</div>
  if (currentGoals.length === 0) return (
  <>
    <div className={stylesPersonalGoal['set-goal-text']}>
      Set a personal goal for the week
    <form onSubmit={addGoal}>
      <input type="number" min="1" value={personalGoal} placeholder="Enter your goal" onChange={handlePersonalGoalChange} />
      <button type="submit" data-testid="set-goal-button">Set</button>
    </form>
    </div> 
  </>
  )

  const data = currentProgress !== null ? [
    { id: 'completed', value: currentProgress.toFixed(1), color: 'hsl(150, 60%, 40%)' },
    { id: 'remaining', value: Math.max(currentGoals[0].goalDistance - currentProgress, 0).toFixed(1), color: 'hsl(0, 0%, 80%)' },
  ] : []
  
  return (
    <div>
      <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
        <ResponsivePie
          data={data}
          innerRadius={0.75}
          startAngle={-160}
          endAngle={160}
          padAngle={1.5}
          cornerRadius={3}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          isInteractive={true}
          legends={[]}
          motionConfig="stiff"
          defs={[
            linearGradientDef('gradientCompleted', [
              { offset: 0, color: '#66e375' },
              { offset: 100, color: '#4ea8ed' },
            ]),
            linearGradientDef('gradientRemaining', [
              { offset: 0, color: '#ffc821', opacity: 0.6 },
              { offset: 100, color: '#ff4545', opacity: 0.6 },
            ]),
            linearGradientDef('gradientFull', [
              { offset: 0, color: '#ad8de3' },
              { offset: 100, color: '#4ea8ed' },
            ]),
          ]}
          fill={[
            { match: { id: 'completed' }, id: completedPieColor },
            { match: { id: 'remaining' }, id: 'gradientRemaining' },
          ]}
          layers={[
            'arcs',
            ({ centerX, centerY }) => (
              <text
                x={centerX}
                y={centerY-3}
                textAnchor="middle"
                dominantBaseline="central"
                className={stylesPersonalGoal['progress-text']} data-testid="progress-text"
              >
                {currentProgress?.toFixed(1) || 0} / {currentGoals[0].goalDistance}
              </text>
            ),
          ]}
        />
      </div>
    </div>
  )
}

export default PersonalGoalTracker
