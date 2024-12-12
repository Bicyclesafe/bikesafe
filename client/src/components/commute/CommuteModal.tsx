import { useAuth } from "../../hooks/useAuth"
import { addCommuteDistance } from "../../services/commuteService"
import styles from "./Commute.module.css"
import Notification from "../notification/Notification"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CommuteModal: React.FC<{routeDistance: number}> = ({routeDistance}) => {
	const { user } = useAuth()
  const [notificationVisible, setNotificationVisible] = useState(false)
	const navigate = useNavigate()

	const saveDistance = async (routeDistance: number) => {
		if (user) {
			const token = await user.getIdToken(true)
			await addCommuteDistance(token, routeDistance)
      setNotificationVisible(true)
      setTimeout(() => {
        setNotificationVisible(false)
        navigate("/dashboard")
      }, 2000)
		}
	}

    return (
			<div className={styles['overlay-container']}>
				<h2>Commute distance: {routeDistance}km</h2>
				<button onClick={() => saveDistance(routeDistance)} className={`${styles['base-button']}`} id={styles['theft-button']}>Save Commute</button>
        <Notification visible={notificationVisible} message="Commute saved"/>
			</div>
    )
}

export default CommuteModal