const {
  asiaPool,
  koreaPool,
  usPool,
  japanPool,
  europePool,
} = require("../dbConfigPool");

module.exports = {
  getCurrentPool: (req) => {
    const referer = req.get("Referer").split("/")[3];
    let currentPool = "";
    switch (referer) {
      case "asia":
        currentPool = asiaPool;
        break;
      case "kr":
        currentPool = koreaPool;
        break;
      case "us":
        currentPool = usPool;
        break;
      case "jp":
        currentPool = japanPool;
        break;
      case "eu":
        currentPool = europePool;
        break;
      default:
        console.log("no pool");
        break;
    }
    return currentPool;
  },
};
