import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map } from './components';
import {MapProps} from "./components/Map.tsx";
import {PinMarker} from "./example/PinMarker.tsx";
import {GeoJSONSourceSpecification} from "mapbox-gl";

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
    <Map source={source as MapProps<GeoJSONSourceSpecification>['source']}>
      {/* IT CAN BE IMPROVED INSIDE A LAYER COMPONENT */}
      {source[0].data.data.features.map(({ geometry, properties }) => (
        <PinMarker lat={geometry.coordinates[1]} lng={geometry.coordinates[0]} properties={properties}/>
      ))}
    </Map>
  )
}

export default App
