import { ResponsiveLine } from '@nivo/line'
import { format } from 'date-fns'
import { FC } from 'react'

interface ActivityLineChartData {
  id: string
  data: { x: string, y: number }[]
}

interface ActivityLineChartProps {
  data: ActivityLineChartData[]
}

const ActivityLineChart: FC<ActivityLineChartProps> = (data) => {
  return (
    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
      <ResponsiveLine
        data={data.data}
        margin={{ top: 30, right: 70, bottom: 60, left: 70 }}
        enableGridX={false}
        lineWidth={3}
        colors={{ scheme: 'paired' }}
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
          legend: 'Active cyclists',
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
}

export default ActivityLineChart