import { useState } from 'react'

// Keeps track of layer state on the canvas.

// A layer contains the following data:
// {
//   name(id),
//   index,
//   x,
//   y,
//   width,
//   height,
//   device,
//   type,
// }

const useLayers = (initialLayer) => {
  const [layers, setLayers] = useState([initialLayer]);

  // Updates a layer
  const updateLayer = async (layer, client) => {
    try {
      const { name, device, type, ...layerProps } = layer;
      await client.updateVideoDeviceComposition(name, layerProps);
      setLayer(layer);
    } catch (err) {
      throw Error(err);
    }
  };

  // Add Layer
  const addLayer = async (layer, client) => {
    if (layer.type === 'VIDEO') {
      addVideoLayer(layer, client);
    } else if (layer.type === 'image') {
      addImageLayer(layer, client);
    }
  };

  // Adds a video layer
  const addVideoLayer = async (layer, client) => {
    try {
      if (layer.visible) {
        const { name, device, ...layerProps } = layer;

        // If a layer with the same name is already added, remove it
        if (client.getVideoInputDevice(layer.name)) {
          await removeLayer(layer, client);
        }

        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: device.deviceId },
            width: {
              ideal: 1920,
              max: 3840,
            },
            height: {
              ideal: 1080,
              max: 2160,
            },
          },
          audio: true,
          aspectRatio: { ideal: 16 / 9 },
          frameRate: 30,
        });

        await client.addVideoInputDevice(cameraStream, name, layerProps);
      }
      setLayers((prevState) => [...prevState, layer]);
    } catch (err) {
      throw Error(err);
    }
  };


  // Adds an image layer
  const addImageLayer = async (layer, client) => {
    try {
      const { name, imageSrc, type, ...layerProps } = layer;

      // If a layer with the same name is already added, throw an error
      if (client.getVideoInputDevice(layer.name)) {
        await removeLayer(layer, client);
      }

      const img = new Image();
      img.src = `${imageSrc}`;

      img.addEventListener(
        'load',
        async () => {
          await client.addImageSource(img, name, layerProps);
          setLayers((prevState) => [...prevState, layer]);
        },
        { once: true }
      );
    } catch (err) {
      throw Error(err);
    }
  };

  // Removes a layer from the layer array and removes it from the canvas
  const removeLayer = async (layer, client) => {
    if (!layer) return;
    try {
      const { name } = layer;
      if (!name) return;
      switch (layer.type) {
        case 'VIDEO':
          const videoStream = client.getVideoInputDevice(name);
          if (videoStream) {
            for (const track of videoStream.source.getVideoTracks()) {
              track.stop();
            }
          }
          await client.removeVideoInputDevice(name);
          break;
        case 'IMAGE':
          await client.removeImage(name);
          break;
        default:
          break;
      }
      setLayers((prevState) =>
        prevState.filter((layer) => layer.name !== name)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Sets a layer given a layer reference. Returns void.
  const setLayer = (layer) => {
    const foundIndex = layers.findIndex((l) => l.name === layer.name);
    setLayers((prevState) => {
      prevState[foundIndex] = layer;
      return prevState;
    });
  };

  return {
    updateLayer,
    addLayer,
    removeLayer,
  };
};

export default useLayers;
