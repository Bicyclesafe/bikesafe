import { Circle } from 'react-leaflet'
import React, { memo } from 'react'
import { LockStation } from '../types'

const LockStationMarker: React.FC<{ station: LockStation }> = memo(({ station }) => (
    <Circle
    center={[station.coordinate.lat, station.coordinate.lng]}
    color="#0000FF"
    radius={5}
    />
  ))

export default LockStationMarker