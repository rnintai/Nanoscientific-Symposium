const path = require("path");
const { getCurrentPool } = require("../utils/getCurrentPool");

const adminCtrl = {
  addSession: async (req, res) => {
    const { nation, title, date } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `INSERT INTO program_sessions(session_title,date) VALUES('${title}','${date.substr(
        0,
        10
      )}')`;

      const result = await connection.query(sql);
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },
  modifySession: async (req, res) => {
    const { nation, title, date, id, status } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `UPDATE program_sessions SET session_title='${title}',date='${date.substr(
        0,
        10
      )}', status=${status} WHERE id=${id}`;

      const result = await connection.query(sql);
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },
  addProgram: async (req, res) => {
    const {
      nation,
      session,
      title,
      speakers,
      description,
      startTime,
      endTime,
    } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `INSERT INTO programs(session,start_time,end_time,title,speakers,description) VALUES(${session},'${startTime}','${endTime}','${title}','${speakers}','${description}')`;

      await connection.query(sql);
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },
  modifyProgram: async (req, res) => {
    const {
      nation,
      title,
      id,
      status,
      session,
      speakers,
      description,
      startTime,
      endTime,
    } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `UPDATE programs SET session=${session}, title='${title}',speakers='${speakers}',description="${description}",start_time='${startTime}',end_time='${endTime}', status=${status} WHERE id=${id}`;

      await connection.query(sql);
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  getHideProgram: async (req, res) => {
    const { nation } = req.query;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `SELECT * FROM programs WHERE status=0`;
      const result = await connection.query(sql);
      res.send(result[0]);
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  getHideSession: async (req, res) => {
    const { nation } = req.query;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `SELECT * FROM program_sessions WHERE status=0`;
      const result = await connection.query(sql);
      res.send(result[0]);
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  showProgram: async (req, res) => {
    const { nation, programs } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      programs.map(async (program) => {
        const sql = `UPDATE programs SET status=1 WHERE id=${program.id}`;
        await connection.query(sql);
      });
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  showSession: async (req, res) => {
    const { nation, sessions } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      sessions.map(async (session) => {
        const sql = `UPDATE program_sessions SET status=1 WHERE id=${session.id}`;
        await connection.query(sql);
      });
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  addSpeaker: async (req, res) => {
    const { nation, name, belong, imagePath } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `INSERT INTO speakers(name,belong,image_path,status) VALUES('${name}','${belong}','${imagePath}',1)`;

      await connection.query(sql);
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },
  modifySpeaker: async (req, res) => {
    const { nation, name, belong, imagePath, id, status } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE speakers SET name='${name}', belong='${belong}',image_path='${imagePath}',status=${status} WHERE id=${id}`;

      await connection.query(sql);
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  showSpeaker: async (req, res) => {
    const { nation, speakers } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      speakers.map(async (speaker) => {
        const sql = `UPDATE speakers SET status=1 WHERE id=${speaker.id}`;
        await connection.query(sql);
      });
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  getHideSpeaker: async (req, res) => {
    const { nation } = req.query;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `SELECT * FROM speakers WHERE status=0`;
      const result = await connection.query(sql);
      res.send(result[0]);
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  getUsers: async (req, res) => {
    const { nation } = req.query;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      let sql = "";
      if (nation === "eu") {
        // eu 일땐 점수메기는항목 5개 존재
        sql = `SELECT id,email,title,role,last_name lastName,first_name firstName,university,institute,street,zipCode,city,research_field reserachField,afm_tool afmTool,nanomechanical,characterization_of_soft,advanced_imaging,high_resolution_imaging,automation_in_afm,createdAt,ps_opt_in FROM user`;
      } else {
        sql = `SELECT id,email,title,role,last_name lastName,first_name firstName,university,institute,street,zipCode,city,research_field reserachField,createdAt,ps_opt_in FROM user`;
      }
      const result = await connection.query(sql);
      res.send(result[0]);
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = adminCtrl;
