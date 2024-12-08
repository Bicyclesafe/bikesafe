import { LineLayerProps } from "../../types"

const LineLayer = ({ innerHeight, bars, data, color, viewMode, highestValue }: LineLayerProps) => {
  if (data.length === 0 || bars.length === 0) return
  if ((viewMode === "day" && !data[0].day) || (viewMode === "year" && !data[0].monthNumber)) return

  const positions = data.map(d => {
    const barIndex = (viewMode === "year" ? Number(d.monthNumber) : Number(d.day)) - 1
    const xPosition = bars[barIndex].width / 2 + bars[barIndex].x
    const yPosition = innerHeight - Number(d.value) * innerHeight / highestValue
    return { x: xPosition, y: yPosition }
  })

  const lineData = `M ${positions[0].x},${positions[0].y} ` + positions.slice(1).map(p => `L ${p.x},${p.y}`).join(' ')

  return (
    <>
      <path data-testid="line-layer-path"
        d={lineData}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
      />
      {positions.map((position, index) => (
        <circle
          key={index}
          cx={position.x}
          cy={position.y}
          r={4}
          fill="white"
          stroke={color}
          strokeWidth={1.5}
        />
      ))}
    </>
  )
}

export default LineLayer
