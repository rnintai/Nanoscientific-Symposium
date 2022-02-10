const { latamConnection } = require("../dbConfig");
const path = require("path");

const latamCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/latam/landing.html"));
  },

  getSponsors: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/latam/sponsors.html"));
  },

  // 프로그램과 세션 조인시켜서 가져오는것보다 따로가져오는게 프론트에서 랜더링하기 편함
  getPrograms: async (req, res) => {
    const sql = `SELECT * FROM programs`;
    latamConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },

  getSessions: async (req, res) => {
    const sql = `SELECT * FROM program_sessions`;
    latamConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },

  getSpeakers: async (req, res) => {
    const sql = `SELECT * FROM speakers`;
    latamConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },
};

module.exports = latamCtrl;
