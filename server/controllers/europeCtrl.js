const { asiaConnection, koreaConnection } = require("../dbConfig");
const path = require("path");

const europeCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/europe/landing.html"));
  },
};

module.exports = europeCtrl;
