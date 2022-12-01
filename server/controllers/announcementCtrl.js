const { getCurrentPool } = require("../utils/getCurrentPool");

const announcementCtrl = {
  getPostAllListLength: async (req, res) => {
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT id FROM announcement`;
      const row = await connection.query(sql);
      connection.release();
      if (row[0].length != 0) {
        res.status(200).json({
          success: true,
          result: row[0].length,
          msg: "성공",
        });
      } else {
        res.status(200).json({
          success: true,
          result: [],
          msg: "해당 데이터가 없음",
        });
      }
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        msg: err,
      });
    }
  },
  getPostList: async (req, res) => {
    const { nation, page } = req.query;
    const currentPool = getCurrentPool(nation);
    const postPerPage = 5;

    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT 
      *,
      (SELECT count(*) FROM announcement) as total_count
      FROM announcement 
      ORDER BY created DESC 
      LIMIT ${(Number(page) - 1) * postPerPage},${postPerPage}`;

      const row = await connection.query(sql);
      connection.release();
      if (row[0].length !== 0) {
        res.status(200).json({
          success: true,
          result: row[0],
          totalCount: row[0][0].total_count,
          msg: "성공",
        });
      } else {
        res.status(200).json({
          success: true,
          msg: "해당 데이터가 없음",
        });
      }
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        msg: err,
      });
    }
  },
  getPostById: async (req, res) => {
    const { nation, id, admin } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql =
        admin == 1
          ? `SELECT id,title,content,created, hits FROM announcement WHERE id=${id}`
          : `SELECT id,title,content,created, hits+1 as hits FROM announcement WHERE id=${id}`;
      const row = await connection.query(sql);
      connection.release();

      // 조회수 추가
      if (admin == 0) {
        const sql2 = `UPDATE announcement SET hits=${row[0][0].hits} WHERE id=${id}`;
        const row2 = await connection.query(sql2);
      }
      connection.release();

      if (row[0].length !== 0) {
        res.status(200).json({
          success: true,
          result: row[0][0],
          msg: "성공",
        });
      } else {
        res.status(200).json({
          success: true,
          msg: "해당 데이터가 없음",
        });
      }
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        msg: err,
      });
    }
  },
  addPost: async (req, res) => {
    const { nation, title, content, id, created } = req.body;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      if (!id) {
        sql = `INSERT INTO announcement
        (title, content)
        VALUES
        ('${title}','${content}')
        `;
      } else {
        sql = `
        UPDATE announcement SET
        title='${title}',
        content='${content}'
        WHERE id=${id}
        `;
      }
      const row = await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
        msg: "성공",
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        msg: err,
      });
    }
  },
  deletePost: async (req, res) => {
    const { nation, id } = req.query;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `DELETE FROM announcement WHERE id=${id}`;
      const row = await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
        msg: "성공",
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        msg: err,
      });
    }
  },
};

// 유저 id에 대한 annoucement만 가져와야하는 작업

module.exports = announcementCtrl;
