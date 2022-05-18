const { getCurrentPool } = require("../utils/getCurrentPool");

const announcementCtrl = {
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
      console.log(err);
      res.status(500).json({
        success: false,
        msg: err,
      });
    } finally {
      connection.release();
    }
  },
  getPostById: async (req, res) => {
    const { nation, id } = req.query;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM announcement WHERE id=${id}`;
      const row = await connection.query(sql);

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
      console.log(err);
      res.status(500).json({
        success: false,
        msg: err,
      });
    } finally {
      connection.release();
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
        content='${content}',
        created='${created}'
        WHERE id=${id}
        `;
      }
      const row = await connection.query(sql);

      res.status(200).json({
        success: true,
        msg: "성공",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        msg: err,
      });
    } finally {
      connection.release();
    }
  },
  deletePost: async (req, res) => {
    const { nation, id } = req.query;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `DELETE FROM announcement WHERE id=${id}`;
      const row = await connection.query(sql);
      res.status(200).json({
        success: true,

        msg: "성공",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        msg: err,
      });
    } finally {
      connection.release();
    }
  },
};
module.exports = announcementCtrl;
