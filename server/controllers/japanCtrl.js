const { japanConnection } = require("../dbConfig");
const path = require("path");

const japanCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/japan/landing.html"));
  },

  getSponsors: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/japan/sponsors.html"));
  },

  getExhibitParkSystems: async (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "public/japan/japanExhibitParkSystems.html")
    );
  },
  
};

module.exports = japanCtrl;
