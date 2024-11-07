import { useEffect, useState } from "react"
import { PersonalGoal } from "../../types"
import goalService from "../../services/goalService"
import { useAuth } from "../../hooks/useAuth"
import tripService from "../../services/tripService"

const PersonalGoalTracker = () => {
  const [currentGoals, setCurrentGoals] = useState<PersonalGoal[]>([])
  const [currentProgress, setCurrentProgress] = useState<number | null>(null)
  const { user } = useAuth()
  

  useEffect(() => {
    const fetchData = async () => {
      const currentGoalResponse = await goalService.getCurrentGoalsForUser(user?.uid)
      setCurrentGoals(currentGoalResponse)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchProgress = async () => {
      if (currentGoals.length > 0 && user?.uid) {
        console.log(currentGoals[0].startTime);
        const tripsResponse = await tripService.getTripsBetweenDates(
          user.uid,
          currentGoals[0].startTime,
          currentGoals[0].endTime
        );
        setCurrentProgress(tripsResponse);
      }
    };
    fetchProgress();
  }, [currentGoals])
  
  return(
    currentGoals.length > 0 && currentProgress
      ?
        <>
          {currentProgress || 0} / {currentGoals[0].goalDistance}
          <progress value={currentProgress/currentGoals[0].goalDistance}/>
        </>
      :
        <div>Loading...</div>
  )
}

export default PersonalGoalTracker