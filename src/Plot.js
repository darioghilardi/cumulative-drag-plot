import React, {useState, useEffect} from 'react'
import {
  VictoryChart,
  VictoryAxis,
  VictoryArea,
  VictoryLabel,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory'
import useDimensions from 'react-use-dimensions'

const Background = ({background, ...props}) => {
  return <image href={background} {...props} />
}

export const Plot = ({
  background,
  height,
  points,
  minX,
  maxX,
  minY,
  maxY,
  imageSize,
  expand,
}) => {
  const padding = {l: 50, r: 50, t: 50, b: 50}
  const [width, setWidth] = useState(0)
  const [measureRef, {width: measuredWidth}] = useDimensions()

  useEffect(() => {
    if (expand) {
      // Set a default width to avoid react warnings
      setWidth(measuredWidth ? measuredWidth : 200)
    } else {
      // Calculate the chart width using the image height and the image proportions
      const {width: imageWidth, height: imageHeight} = imageSize
      setWidth((242.5 * imageWidth) / imageHeight + padding.l + padding.r)
    }
  }, [expand])

  if (width === 0) return <span />

  return (
    <div ref={measureRef} className="flex justify-around">
      <div style={{width}}>
        <VictoryChart
          height={height}
          width={width}
          style={{background: {opacity: 0.5}}}
          backgroundComponent={
            <Background
              preserveAspectRatio={expand ? 'none' : 'xMidYMid'}
              y={padding.t}
              x={padding.l}
              height={height - padding.t - padding.b}
              width={width - padding.l - padding.r}
              background={background}
            />
          }
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryVoronoiContainer
              labels={(d) =>
                `x: ${d.datum.x.toFixed(3)} y: ${d.datum.y.toFixed(3)}`
              }
            />
          }
        >
          <VictoryArea
            style={{
              data: {fill: '#8ADCD7', fillOpacity: '0.5', line: '#8ADCD7'},
            }}
            data={points}
            standalone={true}
            height={height}
            width={width - 100}
          />

          <VictoryAxis
            dependentAxis
            axisLabelComponent={<VictoryLabel dy={-30} />}
            label="Comulative drag force [N]"
            domain={[minY, maxY]}
            offsetX={50}
            orientation={'left'}
            standalone={false}
          />
          <VictoryAxis
            axisLabelComponent={<VictoryLabel dy={28} />}
            label="Position along model [m]"
            domain={[minX, maxX]}
            offsetY={50}
            orientation={'bottom'}
            standalone={false}
          />
        </VictoryChart>
      </div>
    </div>
  )
}
