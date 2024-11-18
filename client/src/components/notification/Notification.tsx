import { FC } from "react"
import styles from "./Notification.module.css"

const Notification: FC<{visible: boolean, message: string}> = ({visible, message}) => {
    return (
        visible && (
            <div className={styles["notification"]}>
                <p>{message}</p>
            </div>
        )
    )
}

export default Notification