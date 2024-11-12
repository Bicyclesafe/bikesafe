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

  if (loading) return <div>Loading...</div>
  if (currentGoals.length === 0) return <div>No personal goals yet</div>

  const data = currentProgress !== null ? [
    { id: 'Completed', value: currentProgress, color: 'hsl(150, 60%, 40%)' },
    { id: 'Remaining', value: Math.max(currentGoals[0].goalDistance - currentProgress, 0), color: 'hsl(0, 0%, 80%)' },
  ] : []
  
  return (
    <div style={{ height: 200 }}>
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
