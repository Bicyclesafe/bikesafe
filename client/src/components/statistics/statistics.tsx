import bicycleIcon from "../../assets/bicycle.svg"
import timerIcon from "../../assets/timer.svg"
import leafIcon from "../../assets/leaf.png"
import { Statistic, StatsDataProps } from "../../types"

export const typeToIcon: Record<string, string> = {
  distance: bicycleIcon,
  duration: timerIcon,
  impact: leafIcon,
}

const statistics = (data: StatsDataProps | null): Statistic[] | null => {
  if (!data) return null

  return [
    {
      title: "Cycled This Year",
      value: data.yearlyTotalDistance,
      unit: "km",
      type: "distance",
    },
    {
      title: "Longest Ride by Distance",
      value: data.longestTripDistance,
      unit: "km",
      type: "distance",
    },
    {
      title: "Average Speed",
      value: data.yearlyAverageSpeed,
      unit: "km/h",
      type: "duration",
    },
    {
      title: "Longest Ride by Time",
      value: data.longestTripDuration,
      unit: "",
      type: "duration",
    },
    {
      title: "Hours Cycled",
      value: data.yearlyTotalDuration,
      unit: "h",
      type: "duration",
    },
    {
      title: "Average Ride Duration",
      value: data.yearlyAverageDuration,
      unit: "",
      type: "duration",
    },
    {
      title: (
        <>
          CO<sub>2</sub> Emissions Saved
        </>
      ),
      value: data.co2EmissionsSaved,
      unit: "kg",
      type: "impact",
    },
    {
      title: "Calories Burned",
      value: data.yearlyCaloriesBurned,
      unit: "kcal",
      type: "impact",
    },
  ]
}

export default statistics