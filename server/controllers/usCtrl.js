const { asiaConnection, koreaConnection } = require("../dbConfig");
const path = require("path");

const usCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/us/landing.html"));
  },

  getSponsors: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/us/sponsors.html"));
  },
};

module.exports = usCtrl;
