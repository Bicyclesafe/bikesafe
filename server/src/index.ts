import { app } from "./app"
import { connectToDatabase } from "./util/db"
import { PORT } from "./util/config"
import { getAllLockStations } from "./services/lockStationService"

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
  }
}

getAllLockStations().catch((error) => { console.log(error) })

startServer().catch((error) => {
  console.error("Unhandled error on server startup:", error)
})