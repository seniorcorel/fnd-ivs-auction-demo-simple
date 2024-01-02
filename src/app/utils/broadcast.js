function formatConfig(config) {
  const streamConfig = {
    maxResolution: {
      width: config.w,
      height: config.h,
    },
    maxFramerate: 30,
    maxBitrate: config.bitrate,
  };
  return streamConfig;
}

export const getConfigFromResolution = (resolution) => {
  let config;
  switch (resolution) {
    case '1080':
      config = {
        w: 1920,
        h: 1080,
        bitrate: 8500,
      };
      break;
    case '720':
      config = {
        w: 1280,
        h: 720,
        bitrate: 6500,
      };
      break;
    case '480':
      config = {
        w: 853,
        h: 480,
        bitrate: 3500,
      };
      break;
    case '360':
      config = {
        w: 640,
        h: 360,
        bitrate: 3500,
      };
      break;
    default:
      config = {
        w: 1280,
        h: 720,
        bitrate: 6500,
      };
      break;
  }
  const streamConfig = formatConfig(config);
  return streamConfig;
}
