import useActions from '../state/useActions';
import constants from '../constants';

const useStream = () => {
  const { setStreamLoading, openNotification } = useActions()
  const startStream = async (
    client,
    ingestServer,
    streamKey,
    getPlaybackUrl
  ) => {
    try {
      setStreamLoading(true)
      client.config.ingestEndpoint = ingestServer;
      // Resume the audio context to prevent audio issues when starting a stream after idling on the page
      await client.getAudioContext().resume();
      await client.startBroadcast(streamKey);
      getPlaybackUrl()
    } catch (err) {
      switch (err.code) {
        case 10000:
          openNotification(constants.NOTIFICATION_MESSAGES.STREAM_ERROR)
          break;
        default:
          openNotification(`Error starting stream: ${err.message}.`)
          break;
      }
      setStreamLoading(false)
    }
  };

  const stopStream = async (client, getPlaybackUrl) => {
    try {
      setStreamLoading(true)
      await client.stopBroadcast();
      setTimeout(() => {
        setStreamLoading(false)
        getPlaybackUrl()
      }, 3000);
    } catch (err) {
      setStreamLoading(false)
      openNotification(`${err.name}: ${err.message}`)
    }
  };

  return {
    stopStream,
    startStream,
  };
};

export default useStream