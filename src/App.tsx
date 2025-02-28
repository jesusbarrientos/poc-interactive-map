import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map } from './components';
import {CatPinLayer} from "./example/CatPinLayer.tsx";

function App() {
  return (
    <Map>
      <CatPinLayer />
    </Map>
  )
}

export default App
