const { asiaConnection, koreaConnection } = require("../dbConfig");
const path = require("path");

const japanCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/japan/landing.html"));
  },
};

module.exports = japanCtrl;
