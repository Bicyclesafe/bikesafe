import { ResponsivePie } from '@nivo/pie'
import { FC } from 'react'

interface ActivityPierChartProps {
  data: {
    id: string
    value: number
  }[]
}

const ActivityPieChart: FC<ActivityPierChartProps> = (data) => {
  return (
    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
      <ResponsivePie
        data={data.data}
        margin={{ top: 40, right: 70, bottom: 70, left: 70 }}
        colors={{ scheme: 'set2' }}
        innerRadius={0.5}
        padAngle={1.5}
        cornerRadius={3}
        motionConfig={"stiff"}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.2
            ]
          ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              3
            ]
          ]
        }}
        theme={{
          labels: {
            text: {
              fontSize: 14,
            },
          },
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 20,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                    itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
    />
    </div>
  )
}

export default ActivityPieChart