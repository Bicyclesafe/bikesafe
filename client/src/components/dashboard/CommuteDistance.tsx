import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getCommuteDistance } from "../../services/commuteService"
import stylesRow from "./CommuteDistance.module.css"
import { IconButton } from "@mui/material"
import { KeyboardArrowRight } from "@mui/icons-material"
// import { IconButton } from "@mui/material"
// import { KeyboardArrowRight } from "@mui/icons-material"


const CommuteDistance = () => {
  const [distance, setDistance] = useState<number>(0)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      return
    }

    const fetchDistance = async () => {
      const token = await user.getIdToken(true)
      const distance = await getCommuteDistance(token as string)
      if (distance === null || distance === '') {
        return
      }
      setDistance(distance)
    }

    fetchDistance()
  }, [user])

  return (
    <div className={distance === 0 ? stylesRow["row-alert"] : stylesRow["row-normal"]}>
      {distance === 0 ? 'Set commute' : `${distance} km` }
      <IconButton
      sx={{
        position: "absolute",
        top: "50%",
        right: "0rem",
        transform: "translateY(-50%)",
        color: "white",
      }}
      size="small"
    >
      <KeyboardArrowRight />
    </IconButton>
  </div>
  )
} 

export default CommuteDistance