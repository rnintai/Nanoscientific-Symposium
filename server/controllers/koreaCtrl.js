const { koreaConnection } = require("../dbConfig");
const path = require("path");

const koreaCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/korea/landing.html"));
  },

  getSponsors: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/korea/sponsors.html"));
  },

 
};

module.exports = koreaCtrl;
