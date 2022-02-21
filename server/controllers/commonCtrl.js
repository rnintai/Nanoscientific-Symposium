const path = require("path");
const { getCurrentPool } = require("../utils/getCurrentPool");

const commonCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/common/landing.html"));
  },

  getExhibitParkSystems: async (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "public/common/exhibitParkSystems.html")
    );
  },

  getNanoScientific: async (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "public/common/exhibitNanoScientific.html")
    );
  },
  getMaintenance: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/common/maintenance.html"));
  },

  getPrograms: async (req, res) => {
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM programs WHERE status=1 ORDER BY start_time `;
      const result = await connection.query(sql);
      res.send(result[0]);
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },
  getSessions: async (req, res) => {
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM session WHERE status=1 ORDER BY date `;
      const result = await connection.query(sql);
      res.send(result[0]);
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },
  getSpeakers: async (req, res) => {
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM speakers WHERE status=1`;
      const result = await connection.query(sql);
      res.send(result[0]);
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = commonCtrl;
