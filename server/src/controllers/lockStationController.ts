import { Response, Request, NextFunction } from "express"
import { Coordinate } from "../models/coordinate"
import { Coordinate as CoordinateType } from "../types"
import { LockStation } from "../models/lockStation"
import { sequelize } from "../util/db"


export const getLockStations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const lockStation = await LockStation.findAll({
      include: {
        model: Coordinate,
      }
    })
    res.status(200).json(lockStation)
  } catch (err) {
    next(err)
  }
}

export const saveLockStation = async (coordinates: CoordinateType[]) => {
    if (coordinates.length === 0) {
      throw new Error('Coordinates array is empty')
    }

    const transaction = await sequelize.transaction()

    try {
      const existingCoordinate = await Coordinate.findOne({ where: { lat: coordinates[0].lat, lng: coordinates[0].lng }, transaction })
  
      if (!existingCoordinate) {
        const maxGroupId = (await LockStation.max<number, LockStation>('groupId', {transaction})) ?? 0
        const nextGroupId = maxGroupId + 1
        await Promise.all(
        coordinates.map(async (coordinate) => {
          const newCoordinate = await Coordinate.create({ lat: coordinate.lat, lng: coordinate.lng }, { transaction })
          await LockStation.create({ coordinateId: newCoordinate.id, groupId: nextGroupId }, { transaction })
        }))
      }
      await transaction.commit()
    } catch(err) {
      await transaction.rollback()
      console.error('Error saving lock stations:', err)
      throw new Error('Failed to save lock stations')
    }
  }


export default {
  getLockStations,
  saveLockStation
}
