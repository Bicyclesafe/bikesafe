import { FC } from "react"
import { ReportModalProps } from "../types"
import { LatLng } from "leaflet"
import { sendTheftReport } from "../services/theftService"

const ReportModal: FC<ReportModalProps> = ({ theftPosition, setTheftPosition, bikeThefts, setBikeThefts }) => {
    const handleReportConfirm = async (position: LatLng) => {
        const newMarker = await sendTheftReport(position)
        console.log(position)
        setBikeThefts(bikeThefts.concat(newMarker))
        setTheftPosition(null)
    }

    return theftPosition && (
        <div>
            <button onClick={() => handleReportConfirm(theftPosition)}>Confirm</button>
        </div>
    )
}

export default ReportModal