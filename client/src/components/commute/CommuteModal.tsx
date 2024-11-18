import { useAuth } from "../../hooks/useAuth"
import { addCommuteDistance } from "../../services/commuteService"
import styles from "./Commute.module.css"

const CommuteModal: React.FC<{routeDistance: number}> = ({routeDistance}) => {
	const { user } = useAuth()

	const saveDistance = async (routeDistance: number) => {
		if (user) {
			const token = await user.getIdToken(true)
			await addCommuteDistance(token, routeDistance)
		}
	}

    return (  
			<div className={styles['overlay-container']}>
				<h2>Commute distance: {routeDistance}km</h2>
				<button onClick={() => saveDistance(routeDistance)} className={`${styles['base-button']}`} id={styles['theft-button']}>Save Commute</button>
			</div>
    )
}

export default CommuteModal