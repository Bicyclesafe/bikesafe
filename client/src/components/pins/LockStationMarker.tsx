import { Polyline } from 'react-leaflet'
import React, { memo } from 'react'
import { LockStation } from '../../types'

const LockStationMarker: React.FC<{ stationsGroup: LockStation[] }> = memo(({ stationsGroup }) => (
  <Polyline 
    key={stationsGroup[0].groupId}
    positions={stationsGroup.map((station) => station.coordinate)}
    color="blue"
    weight={3}
  />
))

export default LockStationMarker