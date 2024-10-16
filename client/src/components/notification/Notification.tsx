import { FC } from "react"

const Notification: FC<{visible: boolean, message: string}> = ({visible, message}) => {
    return (
        visible && (
            <div>
                <p>{message}</p>
            </div>
        )
    )
}

export default Notification