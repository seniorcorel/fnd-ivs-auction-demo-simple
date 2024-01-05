
// Keeps track of initialized audio devices.

// audioDevice:
// {
//   name(id),
//   device,
//   muted
// }

const useMixer = () => {

  // Add Device
  // Adds an audio device to the mixer
  const addMixerDevice = async (mixerDevice, client) => {
    try {
      const { device, name, muted } = mixerDevice;
      // If it exists, remove the previous device from the canvas
      if (client.getAudioInputDevice(name)) {
        await removeMixerDevice(mixerDevice, client);
      }

      // Get the audio stream
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: device.deviceId },
      });
      // Add the audio stream to the mixer
      await client.addAudioInputDevice(audioStream, name);
      // If the device is set to muted, mute the device
      if (muted) {
        const [microphoneTrack] = client
          .getAudioInputDevice(name)
          .getAudioTracks();
        muteMixerDevice(microphoneTrack);
      }

    } catch (err) {
      console.error(err);
    }
  };

  // Remove Device
  // Removes a device from the mixer
  const removeMixerDevice = async (mixerDevice, client) => {
    if (!mixerDevice) return;

    try {
      const { name } = mixerDevice;
      if (!name) return;
      await client.removeAudioInputDevice(name);

    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Device Mute
  // Toggles mute for an audio device.
  // Returns TRUE if muted, FALSE if not.
  const isMixerDeviceMuted = async (mixerDevice, client) => {
    const { name, mikeOn } = mixerDevice;

    const device = await client.getAudioInputDevice(name)

    const track = device.getAudioTracks();
    const microphoneTrack = track[0]

    // If mute or unmute is not forced, toggle mute
    if (mikeOn) {
      return muteMixerDevice(microphoneTrack);
    } else {
      return unmuteMixerDevice(microphoneTrack);
    }

  };

  const muteMixerDevice = (microphoneTrack) => {
    microphoneTrack.enabled = false;
    return true;
  };

  const unmuteMixerDevice = (microphoneTrack) => {
    microphoneTrack.enabled = true;
    return false;
  };


  return {
    addMixerDevice,
    isMixerDeviceMuted,
  };
};

export default useMixer;
