import { FC, useState } from "react"
import { ReportModalProps } from "../../types"
import { LatLng } from "leaflet"
import { sendTheftReport } from "../../services/theftService"
import styles from './ReportModal.module.css'
import appStyles from '../../App.module.css'

const ReportModal: FC<ReportModalProps> = ({
  theftPosition,
  setTheftPosition,
  bikeThefts,
  setBikeThefts
}) => {
  const [bikeModel, setBikeModel] = useState("")
  const [description, setDescription] = useState("")

  const handleReportConfirm = async (position: LatLng) => {
    const newMarker = await sendTheftReport(position)
    setBikeThefts(bikeThefts.concat(newMarker))
    setTheftPosition(null)
  }

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setTheftPosition(null)
    }
  }

  return theftPosition && (
    <div className={styles['modal-backdrop']} onClick={handleOutsideClick}>
      <div className={styles['modal-content']}>
        <button
          className={styles['button-close']}
          onClick={() => setTheftPosition(null)}
        >
          &#x2715;
        </button>
        <h2>Report Bike Theft</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          handleReportConfirm(theftPosition)
        }}>
          <div className={styles['form-group']}>
            <label>Bike Model</label>
            <input
              type="text"
              value={bikeModel}
              onChange={(e) => setBikeModel(e.target.value)}
            />
          </div>
          <div className={styles['form-group']}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={appStyles['base-button']}
            id={styles['confirm-button']}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReportModal
