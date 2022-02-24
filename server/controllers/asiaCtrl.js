const { asiaConnection } = require("../dbConfig");
const path = require("path");

const asiaCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/asia/landing.html"));
  },

  getSponsors: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/asia/sponsors.html"));
  },
};

module.exports = asiaCtrl;
