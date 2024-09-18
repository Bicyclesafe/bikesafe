import { FC } from "react"

const Notification: FC<{visible: boolean, message: string}> = ({visible, message}) => {
    return !visible ? null : (
        <div>
            <p>{message}</p>
        </div>
      )
}

export default Notification