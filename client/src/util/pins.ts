import L from 'leaflet'

const getPinColor = (type: string) => {
    switch(type) {
      case 'bikeTheft':
        return 'red'
      case 'lockStation':
        return 'green'
      default:
        return 'blue'
    }
  }

export const pinType = (type: string) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${getPinColor(type)}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })