import { ResponsiveLine } from '@nivo/line'
import { format } from 'date-fns'

const data = [
  {
    id: "emissions",
    data: [
      { x: "2023-01-01", y: 5 },
      { x: "2023-02-01", y: 12 },
      { x: "2023-03-01", y: 18 },
      { x: "2023-04-01", y: 26 },
      { x: "2023-05-01", y: 35 },
      { x: "2023-06-01", y: 45 },
      { x: "2023-07-01", y: 58 },
      { x: "2023-08-01", y: 70 },
      { x: "2023-09-01", y: 85 },
      { x: "2023-10-01", y: 102 },
      { x: "2023-11-01", y: 120 },
      { x: "2023-12-01", y: 140 },
    ]
  }
]

const EmissionsLineChart = () => (
  <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 70, bottom: 70, left: 70 }}
      enableGridX={false}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Year',
        legendOffset: 36,
        legendPosition: 'middle',
        truncateTickAt: 0,
        format: value => format(value, 'MMM'),
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'CO2 saved (kg)',
        legendOffset: -40,
        legendPosition: 'middle',
        truncateTickAt: 0
      }}
      enablePoints={false}
      enableTouchCrosshair={true}
      useMesh={true}
    />
  </div>
)

export default EmissionsLineChart