const { asiaConnection, koreaConnection } = require("../dbConfig");
const path = require("path");

const koreaCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/korea/landing.html"));
  },
};

module.exports = koreaCtrl;
