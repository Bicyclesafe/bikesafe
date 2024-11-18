// import { Sequelize } from 'sequelize-typescript';
import { Trip } from '../models/trip' // Adjust the path as needed
// import { User } from '../models/user'; // Ensure this is correctly imported if needed

async function seedTrips() {
  const existingTrips = await Trip.findOne()
  if (existingTrips) {
    console.log('Trips have already been seeded. Skipping seeding process.')
    return
  }
  // Adjust the range and count as needed for more realistic data
  const year = new Date().getFullYear()
  const userId = 1 // Setting userId to 1 for all trips

  for (let month = 0; month < 12; month++) {
    // Randomize number of trips for each month (e.g., between 3 and 10 trips)
    const numTrips = Math.floor(Math.random() * 8) + 3

    for (let i = 0; i < numTrips; i++) {
      // Randomize day and time within the current month
      const day = Math.floor(Math.random() * 28) + 1 // Ensure valid day range (1-28)
      const startHour = Math.floor(Math.random() * 24) // Random hour of the day
      const duration = Math.floor(Math.random() * 3) + 1 // Random duration between 1 and 3 hours

      const startTime = new Date(year, month, day, startHour)
      const endTime = new Date(startTime)
      endTime.setHours(startTime.getHours() + duration)

      // Random trip distance between 5 and 50 km
      const tripDistance = Math.random() * 45 + 5

      // Create the trip record
      await Trip.create({
        userId,
        startTime,
        endTime,
        tripDistance,
      })

      console.log(`Created trip on ${startTime.toISOString()} for user ${userId}`)
    }
  }

  console.log('Seeding completed!')
}

export default seedTrips