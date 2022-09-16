const { getCurrentPool } = require("../utils/getCurrentPool");

const announcementReadCtrl = {
  getPostByUserID: async (req, res) => {
    const { nation, page } = req.query;
    const currentPool = getCurrentPool(nation);
  },
};
