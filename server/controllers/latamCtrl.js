const { asiaConnection, koreaConnection } = require("../dbConfig");
const path = require("path");

const latamCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/latam/landing.html"));
  },
};

module.exports = latamCtrl;
