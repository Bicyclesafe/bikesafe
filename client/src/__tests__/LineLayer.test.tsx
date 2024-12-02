import { render, waitFor, screen } from "@testing-library/react"
import LineLayer from "../components/statistics/LineLayer"
import { BarInfo } from "../types"
import { BarDatum } from "@nivo/bar"

const barWidth = 10
const padding = 5
const bars: BarInfo[] = []
const data: BarDatum[] = []

for (let i = 0; i < 12; i++) {
  bars.push({
    width: barWidth,
    x: i * (barWidth + padding)
  })
  data.push({
    monthNumber: i + 1,
    value: i * 100
  })
}

describe("LineLayer component", () => {
  it("Line layer is rendered at correct positions", async () => {
    render(<LineLayer innerHeight={500} viewMode="year" color="red" bars={bars} data={data} highestValue={1100} />)

    await waitFor(() => {
      const path = screen.getByTestId("line-layer-path")
      expect(path).toBeInTheDocument()
      const pathString = path.getAttribute("d")
      
      for (let i = 0; i < bars.length; i++) {
        const x = (bars[i].width / 2 + bars[i].x).toString()
        const y = 500 - Number(data[i].value) * 500 / 1100
        expect(pathString?.includes(`${x},${y}`)).toBe(true)
      }
    })
    
  })
})