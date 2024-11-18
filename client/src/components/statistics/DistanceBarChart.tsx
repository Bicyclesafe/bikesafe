import { BarDatum, ResponsiveBar } from "@nivo/bar"
import { useEffect, useState } from "react"
import tripService from "../../services/tripService";
import { useAuth } from "../../hooks/useAuth";
import { Trip } from "../../types";

const DistanceBarChart = () => {
    const [data, setData] = useState<BarDatum[] | []>([])
    const { user } = useAuth()
    useEffect(() => {
        console.log('ennnen')
        const fetchData = async () => {
          // Fetch trip data and group by month
          if (user) {
            try {
              console.log('hello')
              const token = await user.getIdToken(true)
              const trips = await tripService.getAllTrips(token as string)
              console.log(trips)
              const monthlyData = Array.from({ length: 12 }, (_, month) => ({
                month: new Date(0, month).toLocaleString('default', { month: 'short' }),
                distance: 0,
              }))

    
              trips.forEach((trip: Trip) => {
                const month = new Date(trip.startTime).getMonth();
                monthlyData[month].distance += trip.tripDistance;
              });
              console.log(monthlyData)
        
              setData(monthlyData)
            } catch (error) {
              console.error('Error fetching goals:', error)
            }
          }
        }
        fetchData();
      }, []);

    return (
      <div style={{ height: '500px' }}>
        <ResponsiveBar
          data={data}
          keys={['distance']}
          indexBy="month"
          enableLabel={false}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: 'nivo' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Distance (km)',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate={true}
          motionConfig="stiff"
        />
      </div>
    )};
  
  export default DistanceBarChart