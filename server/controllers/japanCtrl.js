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

  // 프로그램과 세션 조인시켜서 가져오는것보다 따로가져오는게 프론트에서 랜더링하기 편함
  getPrograms: async (req, res) => {
    const sql = `SELECT * FROM programs`;
    japanConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },

  getSessions: async (req, res) => {
    const sql = `SELECT * FROM program_sessions`;
    japanConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },

  getSpeakers: async (req, res) => {
    const sql = `SELECT * FROM speakers`;
    japanConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },
};

module.exports = japanCtrl;
