import { Response, Request, NextFunction } from "express"
import { Coordinate } from "../models/coordinate"

export const resetDatabase = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        await Coordinate.destroy({where: {}})
        res.status(200).json({message: 'All coordinates have been removed'})
    } catch (err) {
        next(err)
    }

}