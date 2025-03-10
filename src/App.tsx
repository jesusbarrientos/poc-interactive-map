import 'mapbox-gl/dist/mapbox-gl.css';

import { MapController } from './components';

function App() {
  const source = [
    {
      id: 'points',
      data: {
        type: 'geojson',
        generateId: true,
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-74.5, 40]
              },
              properties: {
                name: 'The Gilded Fork',
                category: 'entertainment',
                subCategory: 'restaurant'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-75, 40]
              },
              properties: {
                name: 'The Starlight Cinema',
                category: 'entertainment',
                subCategory: 'cinema'
              }
            }
          ]
        }
      }
    }
  ]

  return (
    <MapController />
  )
}

export default App
