import { useEffect, useState } from "react"
import { PersonalGoal } from "../../types"
import goalService from "../../services/goalService"
import { useAuth } from "../../hooks/useAuth"
import tripService from "../../services/tripService"

const PersonalGoalTracker = () => {
  const [currentGoals, setCurrentGoals] = useState<PersonalGoal[]>([])
  const [currentProgress, setCurrentProgress] = useState<number>(0)
  const { user } = useAuth()
  

  useEffect(() => {
    const fetchGoals = async () => {
      const currentGoalResponse = await goalService.getCurrentGoalsForUser(user?.uid)
      setCurrentGoals(currentGoalResponse)
    }
    fetchGoals()
  }, [user?.uid])

  useEffect(() => {
    const fetchProgress = async () => {
      if (currentGoals.length > 0 && user?.uid) {
        const tripsResponse = await tripService.getTripsBetweenDates(
          user.uid,
          currentGoals[0].startTime,
          currentGoals[0].endTime
        )
        setCurrentProgress(tripsResponse || 0)
      }
    }
    fetchProgress()
  }, [currentGoals, user?.uid])
  
  return(
    currentGoals.length > 0 ? (
      <>
        {currentProgress || 0} / {currentGoals[0].goalDistance}
        <progress value={currentProgress/currentGoals[0].goalDistance}/>
      </>
    ) : (
      <>
        No current goals. <button onClick={() => {}}>Set a Goal</button>
      </>   
    )
  )
}

export default PersonalGoalTracker