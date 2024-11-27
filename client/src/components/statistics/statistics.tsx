import bicycleIcon from "../../assets/bicycle.svg"
import timerIcon from "../../assets/timer.svg"
import leafIcon from "../../assets/leaf.png"
import { Duration } from "date-fns"

interface StatsDataProps {
  yearlyTotalDistance: number;
  yearlyTotalDuration: Duration
  longestTripDuration: Duration
  co2EmissionsSaved: number;
}

interface Statistic {
  title: React.ReactNode;
  value: number | Duration
  unit: string;
  icon: string;
  type: "distance" | "duration" | "emission";
}

const statistics = (data: StatsDataProps): Statistic[] => [
  {
    title: "Cycled This Year",
    value: data.yearlyTotalDistance,
    unit: "km",
    icon: bicycleIcon,
    type: "distance",
  },
  {
    title: "Longest Ride by Time",
    value: data.longestTripDuration,
    unit: "",
    icon: timerIcon,
    type: "duration",
  },
  {
    title: "Hours Cycled",
    value: data.yearlyTotalDuration,
    unit: "h",
    icon: timerIcon,
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
    icon: leafIcon,
    type: "emission",
  }
]

export default statistics