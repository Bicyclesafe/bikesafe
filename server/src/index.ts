import { app } from "./app"
import { connectToDatabase } from "./util/db"
import { PORT } from "./util/config"
import { initializeLockStations } from "./services/lockStationService"
import seedTrips from "./util/seed"

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase()
    await seedTrips()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
  }
}

const startAndInitialize = async () => {
  await startServer()
  await initializeLockStations()
}

startAndInitialize().catch((error) => {
  console.error("Unhandled error on server startup:", error)
})