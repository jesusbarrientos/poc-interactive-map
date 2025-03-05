import styles from './GeolocationConfirmModal.module.scss';
import {useEffect, useState} from "react";

export const GeolocationConfirmModal = () => {
  const [showModal, setShowModal] = useState(false);

  function successCallback(position: GeolocationPosition) {
    console.log('Latitude:', position.coords.latitude);
    console.log('Longitude:', position.coords.longitude);
  }

  function errorCallback(error: GeolocationPositionError) {
    console.error('Error al obtener la ubicación:', error);
  }

  function getGeolocation() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  useEffect(() => {
    async function checkGeolocationPermission(): Promise<PermissionState> {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        return result.state; // 'granted', 'denied', 'prompt'
      } catch (error) {
        console.error('Error al verificar los permisos:', error);
        return 'prompt'; // Asumir 'prompt' en caso de error
      }
    }

    checkGeolocationPermission()
      .then((permissionState) => {
        if (permissionState === 'prompt' || permissionState === 'denied') {
          setShowModal(true);
        } else {
          // Los permisos ya están concedidos
          getGeolocation();
        }
      })
  }, []);

  if ('geolocation' in navigator) {
    function handleYesClick() {
      getGeolocation();
      setShowModal(false);
    }

    function handleNoClick() {
      console.log('El usuario no quiere compartir su ubicación');
      setShowModal(false);
    }

    if (showModal) {
      return (
        <article className={styles.geolocationConfirmModal}>
          <h2>Geolocation</h2>
          <p>Do you want to share your location?</p>
          <button onClick={handleYesClick}>Yes</button>
          <button onClick={handleNoClick}>No</button>
        </article>
      )
    } else {
      return null
    }
  } else {
    return null
  }
}