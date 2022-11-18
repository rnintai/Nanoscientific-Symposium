const {
  asiaPool,
  koreaPool,
  usPool,
  japanPool,
  europePool,
  commonPool,
} = require("../dbConfigPool");

module.exports = {
  getCurrentPool: (req) => {
    let currentPool;
    switch (req) {
      case "asia":
        currentPool = asiaPool;
        break;
      case "kr":
        currentPool = koreaPool;
        break;
      case "americas":
        currentPool = usPool;
        break;
      case "jp":
        currentPool = japanPool;
        break;
      case "eu":
        currentPool = europePool;
        break;
      case "common":
        currentPool = commonPool;
        break;
      default:
        currentPool = "";
        break;
    }
    return currentPool;
  },
};
