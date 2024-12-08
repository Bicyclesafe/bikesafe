// import { Sequelize } from 'sequelize-typescript';
import { Trip } from '../models/trip' // Adjust the path as needed
import { User } from '../models/user'
// import { User } from '../models/user'; // Ensure this is correctly imported if needed
import * as fs from "fs"
import * as path from "path"
import { AchievementJson } from '../types'
import { Achievement } from '../models/achievement'

export async function seedTrips() {
  const userId = 1 // Setting userId to 1 for all trips
  const user: User | null = await User.findOne({ where: { id: userId }})
  if (!user) {
    console.log('Did not find user for seeding, skipping process')
    return
  }
  const existingTrips = await Trip.findOne()
  if (existingTrips) {
    console.log('Trips have already been seeded. Skipping seeding process.')
    return
  }
  // Adjust the range and count as needed for more realistic data
  
  for (let month = 0; month < 12; month++) {
    // Randomize number of trips for each month (e.g., between 3 and 10 trips)
    const numTrips = Math.floor(Math.random() * 8) + 3
    
    for (let i = 0; i < numTrips; i++) {
      // Randomize day and time within the current month
      const day = Math.floor(Math.random() * 28) + 1 // Ensure valid day range (1-28)
      const year = 2024 - Math.floor(Math.random() * 2)
      const startHour = Math.floor(Math.random() * 24) // Random hour of the day

      const durationHours = Math.floor(Math.random() * 3) + 1 // Random hours (1 to 3 hours)
      const durationMinutes = Math.floor(Math.random() * 60) // Random minutes (0 to 59)

      const startTime = new Date(year, month, day, startHour)
      const endTime = new Date(startTime)

      // Add both the random hours and minutes to the start time
      endTime.setHours(startTime.getHours() + durationHours)
      endTime.setMinutes(startTime.getMinutes() + durationMinutes)

      // Random trip distance between 5 and 50 km
      const tripDistance = Math.round(Math.random() * 45 + 5)

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

export const createAchievements = async () => {
  const existingAchievements = await Achievement.findOne()

  if (existingAchievements) {
    console.log('Achievements have already been created. Skipping creating process.')
    return
  }

  const achievementPath = path.join(__dirname, "../../data/achievements.json")
  const achievementData = JSON.parse(fs.readFileSync(achievementPath, "utf8")) as AchievementJson
  const achievements = achievementData.achievements

  for (let i = 0; i < achievements.length; i++) {
    await Achievement.create({
      name: achievements[i].name,
      description: achievements[i].description,
      level: achievements[i].level,
      requirement: achievements[i].requirement,
      groupId: achievements[i].groupId
    })

    console.log(`Created achievement ${achievements[i].name}`)
  }

  console.log('Creating achievements completed!')
}

export default { seedTrips, createAchievements }