import 'mapbox-gl/dist/mapbox-gl.css';

import { MapController } from './components';
import {GeolocationConfirmModal} from "./components/Geolocation/GeolocationConfirmModal.tsx";

function App() {
  return (
    <>
      <GeolocationConfirmModal />
      <MapController />
    </>
  )
}

export default App
