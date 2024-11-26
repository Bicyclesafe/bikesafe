import { FC } from "react"
import { Trip } from "../../types"
import stylesGeneral from "./GeneralStatistics.module.css"
import stylesStatistics from "./StatisticsPage.module.css"
import bicycle from "../../assets/bicycle.svg"
import timerIcon from "../../assets/timer.svg"
import leaf from "../../assets/leaf.png"

const GeneralStatistics: FC<{ rawData: Trip[], year: string }> = ({ rawData, year })=> {
    
    const yearlyTotalDistance = () => {
        const filteredTrips = rawData.filter(
          (trip) => new Date(trip.startTime).getFullYear() === Number(year)
        )

        const sumOfDistance = filteredTrips.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.tripDistance
        }, 0)

        return sumOfDistance


    }

    return (
      <div className={stylesGeneral['general-box']}>
        
        <div className={stylesGeneral['distance-box']}>
          <div> 
            {/* <a href="https://iconscout.com/icons/bicycle" class="text-underline font-size-sm" target="_blank">Bicycle</a> by <a href="https://iconscout.com/contributors/font-awesome" class="text-underline font-size-sm" target="_blank">Font Awesome</a> */}
            <img src={bicycle}/>
            <span className={stylesGeneral['title']}>Cycled this year</span>
          </div>
          <div>
            <span className={stylesStatistics['distance']}>{Number(yearlyTotalDistance().toFixed(1))}</span>
            <span className={stylesStatistics['unit']}>km</span>
          </div>
        </div>
        
        <div className={stylesGeneral['time-box']}>
          <div> 
            {/* <a href="https://iconscout.com/icons/timer" class="text-underline font-size-sm" target="_blank">Timer</a> by <a href="https://iconscout.com/contributors/taras-shypka" class="text-underline font-size-sm" target="_blank">Taras Shypka</a> */}
            <img src={timerIcon}/>
            <span className={stylesGeneral['title']}>Hours cycled</span>
          </div>
          <div>
            <span className={stylesStatistics['distance']}>30</span>
            <span className={stylesStatistics['unit']}>h</span>
          </div>
        
        </div>

        <div className={stylesGeneral['emission-box']}>
          <div> 
            {/* <a href="https://iconscout.com/icons/timer" class="text-underline font-size-sm" target="_blank">Timer</a> by <a href="https://iconscout.com/contributors/taras-shypka" class="text-underline font-size-sm" target="_blank">Taras Shypka</a> */}
            <img src={leaf}/>
            <span className={stylesGeneral['title']}>CO<sub>2</sub> emissions saved</span>
          </div>
          <div>
            <span className={stylesStatistics['distance']}>30</span>
            <span className={stylesStatistics['unit']}>kg</span>
          </div>
        
        </div>

        
        
      </div>
    )
  }

export default GeneralStatistics