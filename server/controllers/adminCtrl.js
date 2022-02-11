const { asiaConnection } = require("../dbConfig");
const path = require("path");

const adminCtrl = {
  addSession: async (req, res) => {
    const { country, title, date } = req.body;
    const sql = `INSERT INTO program_sessions(session_title,date) VALUES('${title}','${date.substr(
      0,
      10
    )}')`;
    asiaConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },
  modifySession: async (req, res) => {
    const { country, title, date, id } = req.body;
    const sql = `UPDATE program_sessions SET session_title='${title}',date='${date.substr(
      0,
      10
    )}' WHERE id=${id}`;

    asiaConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },
};

module.exports = adminCtrl;
