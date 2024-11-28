import { LineLayerProps } from "../../types"

const LineLayer = ({innerHeight, bars, data, color, viewMode, highestValue}: LineLayerProps) => {
  if (data.length === 0 || bars.length === 0) return
  if ((viewMode === "day" && !data[0].day) || (viewMode === "year" && !data[0].monthNumber)) return

  const positionsAsStrings = data.map(d => {
    const barIndex = (viewMode === "year" ? Number(d.monthNumber) : Number(d.day)) - 1
    const xPosition = bars[barIndex].width / 2 + bars[barIndex].x
    const yPosition = innerHeight - Number(d.value) * innerHeight / highestValue
    return `${xPosition},${yPosition}`
  })

  return (
    <path data-testid="line-layer-path"
      d={
        `M 0,${innerHeight} L ` + positionsAsStrings.join(" L ")
      }
      fill="none"
      stroke={color}
      strokeWidth={2.2}
    />
  )
}

export default LineLayer