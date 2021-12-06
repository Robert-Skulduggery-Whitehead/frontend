import radar from "./radar.png";

const high = {
  origin: {},
  pxPerUX: 0.14376095926926907,
  pxPerUY: -0.14736670935219626,
};

const low = {
  origin: {
    x: 473.66746071612374,
    y: 638.302101754172,
  },
  pxPerUX: 0.1436068746398272,
  pxPerUY: -0.14533406508526941,
};

const config = {
  configs: [
    {
      id: "high",
      config: high,
    },
    {
      id: "low",
      config: low,
    },
  ],
  file: radar,
};

export default config;
