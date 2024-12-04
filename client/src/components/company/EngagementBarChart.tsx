import { ResponsiveBar } from '@nivo/bar'

const data = [
  {
    "month": "January",
    "dailyCyclists": 25,
    "weeklyCyclists": 50,
    "monthlyCyclists": 80
  },
  {
    "month": "February",
    "dailyCyclists": 20,
    "weeklyCyclists": 45,
    "monthlyCyclists": 70
  },
  {
    "month": "March",
    "dailyCyclists": 35,
    "weeklyCyclists": 60,
    "monthlyCyclists": 90
  },
  {
    "month": "April",
    "dailyCyclists": 45,
    "weeklyCyclists": 85,
    "monthlyCyclists": 130
  },
  {
    "month": "May",
    "dailyCyclists": 70,
    "weeklyCyclists": 120,
    "monthlyCyclists": 170
  },
  {
    "month": "June",
    "dailyCyclists": 80,
    "weeklyCyclists": 140,
    "monthlyCyclists": 190
  },
  {
    "month": "July",
    "dailyCyclists": 85,
    "weeklyCyclists": 150,
    "monthlyCyclists": 210
  },
  {
    "month": "August",
    "dailyCyclists": 75,
    "weeklyCyclists": 140,
    "monthlyCyclists": 195
  },
  {
    "month": "September",
    "dailyCyclists": 60,
    "weeklyCyclists": 110,
    "monthlyCyclists": 160
  },
  {
    "month": "October",
    "dailyCyclists": 40,
    "weeklyCyclists": 80,
    "monthlyCyclists": 120
  },
  {
    "month": "November",
    "dailyCyclists": 30,
    "weeklyCyclists": 60,
    "monthlyCyclists": 100
  },
  {
    "month": "December",
    "dailyCyclists": 25,
    "weeklyCyclists": 55,
    "monthlyCyclists": 85
  }
]


const EngagementBarChart = () => (
  <div style={{ height: '400px' }}>
    <ResponsiveBar
      data={data}
      keys={['dailyCyclists', 'weeklyCyclists', 'monthlyCyclists']}
      indexBy="month"
      margin={{ top: 30, right: 30, bottom: 60, left: 60 }}
      padding={0.3}
      layout="vertical"
      colors={{ scheme: 'nivo' }}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Cyclists',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Month',
        legendPosition: 'middle',
        legendOffset: 40,
      }}
      tooltip={({ id, value }) => (
        <div style={{ padding: '5px', background: 'rgba(0, 0, 0, 0.7)', color: 'white' }}>
          <strong>{id}</strong>: {value} cyclists
        </div>
      )}
    />
  </div>
)

export default EngagementBarChart