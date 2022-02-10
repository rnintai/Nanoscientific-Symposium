const { koreaConnection } = require("../dbConfig");
const path = require("path");

const koreaCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/korea/landing.html"));
  },

  getSponsors: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/korea/sponsors.html"));
  },

  // 프로그램과 세션 조인시켜서 가져오는것보다 따로가져오는게 프론트에서 랜더링하기 편함
  getPrograms: async (req, res) => {
    const sql = `SELECT * FROM programs`;
    koreaConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },

  getSessions: async (req, res) => {
    const sql = `SELECT * FROM program_sessions`;
    koreaConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },

  getSpeakers: async (req, res) => {
    const sql = `SELECT * FROM speakers`;
    koreaConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },
};

module.exports = koreaCtrl;
