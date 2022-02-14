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
    const { country, title, date, id, status } = req.body;
    const sql = `UPDATE program_sessions SET session_title='${title}',date='${date.substr(
      0,
      10
    )}', status=${status} WHERE id=${id}`;

    asiaConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },
  addProgram: async (req, res) => {
    const {
      country,
      session,
      title,
      speakers,
      description,
      startTime,
      endTime,
    } = req.body;
    const sql = `INSERT INTO programs(session,start_time,end_time,title,speakers,description) VALUES(${session},
    '${startTime}','${endTime}','${title}','${speakers}','${description}')`;

    asiaConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },
  modifyProgram: async (req, res) => {
    const {
      country,
      title,
      id,
      status,
      session,
      speakers,
      description,
      startTime,
      endTime,
    } = req.body;
    const sql = `UPDATE programs SET session=${session}, title='${title}',speakers='${speakers}',description="${description}",start_time='${startTime}',end_time='${endTime}', status=${status} WHERE id=${id}`;

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
