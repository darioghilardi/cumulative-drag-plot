import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {Plot} from './Plot'
import {usePlotData} from './usePlotData'
import {useImageSize} from './useImageSize'
import {ControlPanel} from './ControlPanel'

const Loader = () => <div>Loading</div>

const PlotContainer = ({background, data}) => {
  const [expand, setExpand] = useState(false)
  const [plot, points, minX, maxX, minY, maxY] = usePlotData(data)
  const imageSize = useImageSize(background)
  const chartHeight = 339

  const isLoading = !imageSize || !maxX

  return (
    <div>
      {isLoading ? (
        <>
          <ControlPanel hidden={isLoading} />
          <Loader />
        </>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <ControlPanel hidden={isLoading} />
            <button
              className="btn btn-tertiary btn-xs"
              onClick={() => setExpand(!expand)}
            >
              {expand ? 'Collapse' : 'Expand'}
            </button>
          </div>
          <div>
            <Plot
              points={points}
              minX={minX}
              maxX={maxX}
              maxY={maxY}
              minY={minY}
              height={chartHeight}
              background={background}
              imageSize={imageSize}
              expand={expand}
            />
          </div>
        </>
      )}
    </div>
  )
}

fetch('./forceBins.json').then(function (data) {
  data.json().then((d) => {
    ReactDOM.render(
      <PlotContainer background="./forceBinsBackground_xz.png" data={d} />,
      document.getElementById('root'),
    )
  })
})
