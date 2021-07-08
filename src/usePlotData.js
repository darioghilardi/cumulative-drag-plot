import React, {useEffect, useState} from 'react'
import {useControls} from 'leva'

export const usePlotData = (data) => {
  const [points, setPoints] = useState(null)
  const [minX, setMinX] = useState(null)
  const [maxX, setMaxX] = useState(null)
  const [minY, setMinY] = useState(null)
  const [maxY, setMaxY] = useState(null)

  const {plot} = useControls({
    plot: {
      options: {
        'cumulative drag': {x: 'xpos', y: 'drag_x_cum'},
        'drag x': {x: 'xpos', y: 'drag_x'},
        'drag y': {x: 'ypos', y: 'drag_y'},
        'drag z': {x: 'zpos', y: 'drag_z'},
        'cumulative lift': {x: 'xpos', y: 'lift_x_cum'},
        'lift x': {x: 'xpos', y: 'lift_x'},
        'lift y': {x: 'ypos', y: 'lift_y'},
        'lift z': {x: 'zpos', y: 'lift_z'},
      },
      label: false,
    },
  })

  // Calculate the points and the extremes based on the
  // plot selection
  useEffect(() => {
    const points = data.xpos.map((v, i) => ({
      x: data[plot.x][i],
      y: data[plot.y][i],
    }))
    setPoints(points)
    setMaxX(Math.min(...data[plot.x]))
    setMaxX(Math.max(...data[plot.x]))
    setMaxY(Math.max(...data[plot.y]))
    setMinY(Math.min(...data[plot.y]))
  }, [plot, data])

  return [plot, points, minX, maxX, minY, maxY]
}
