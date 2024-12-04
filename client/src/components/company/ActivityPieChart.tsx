import { ResponsivePie } from '@nivo/pie'

const data = [
  {
    "id": "daily",
    "label": "daily",
    "value": 30,
  },
  {
    "id": "weekly",
    "label": "weekly",
    "value": 40,
  },
  {
    "id": "monthly",
    "label": "monthly",
    "value": 20,
  },
  {
    "id": "yearly",
    "label": "yearly",
    "value": 10,
  },
]

const ActivityPieChart = () => (
  <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
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
            2
          ]
        ]
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

export default ActivityPieChart