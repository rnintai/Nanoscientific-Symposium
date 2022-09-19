const { getCurrentPool } = require("../utils/getCurrentPool");

const announcementReadCtrl = {
  getPostByUserID: async (req, res) => {
    const { nation, id } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT user_id, announcement_id FROM announcement_read WHERE user_id=${id}`;
      const row = await connection.query(sql);
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
};

module.exports = announcementReadCtrl;
