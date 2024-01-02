import { useSelector } from 'react-redux';
import useActions from '../hooks/useActions';
import constants from '../constants';

const useStream = () => {

  const { isLive, isLiveBroadcast } = useSelector(state => state.stream)
  const { setStreamLoading, setIsBroadcast, openNotification, setStoppingStream } = useActions()

  const startStream = async (
    ingestServer,
    streamKey,
    client,
  ) => {
    try {
      setStreamLoading(true);
      // Set the ingest server to re-validate it before attempting to start the stream.
      client.config.ingestEndpoint = ingestServer;

      // Resume the audio context to prevent audio issues when starting a stream after idling on the page
      // in some browsers.
      await client.getAudioContext().resume();
      await client.startBroadcast(streamKey);
      setIsBroadcast(true)
      //* setStreamLoading(false) will be set at GET_STREAM_SUCCESS action
    } catch (err) {
      switch (err.code) {
        case 10000:
          openNotification(constants.NOTIFICATION_MESSAGES.STREAM_ERROR)
          break;
        default:
          openNotification(`Error starting stream: ${err.message}.`)
          break;
      }
      setIsBroadcast(false)
      setStreamLoading(false)

    } finally {
      return;
    }
  };

  const stopStream = async (client) => {
    try {
      setStreamLoading(true)
      setStoppingStream(true)
      await client.stopBroadcast();

      setTimeout(() => {
        // setStreamLoading(false)
        setIsBroadcast(false)
      }, 5000)
    } catch (err) {
      openNotification(`${err.name}: ${err.message}`)
    } finally {
      return;
    }
  };

  return {
    stopStream,
    startStream,
  };
};

export default useStream