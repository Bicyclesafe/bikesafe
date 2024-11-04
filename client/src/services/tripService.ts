import axios from "axios"
import { apiUrl } from "../util/config"

export const getTrips = async (token: string) => {
    const testi = await axios.post(`${apiUrl}/api/testi`, { token: token})
    console.log(testi)
}