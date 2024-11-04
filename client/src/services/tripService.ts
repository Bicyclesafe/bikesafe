import axios from "axios"
import { apiUrl } from "../util/config"

export const addTrips = async (data: {data: string}, token: string) => {
    const authHeader = {"headers": {
        "Authorization": "Bearer " + token
    }}
    const testi = await axios.post(`${apiUrl}/api/testi`, data, authHeader)
    console.log(testi)
}

export const getTrips = async (token: string) => {
    const authHeader = {"headers": {
        "Authorization": "Bearer " + token
    }}
    const testi = await axios.get(`${apiUrl}/api/testi`, authHeader)
    console.log(testi)
}