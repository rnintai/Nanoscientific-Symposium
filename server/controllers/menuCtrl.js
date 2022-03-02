const { getCurrentPool } = require("../utils/getCurrentPool");

const menuCtrl = {
  getIsAdmin: async (req, res) => {
    const { path, nation } = req.body;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT isAdmin FROM menu WHERE path='${path}'`;

      const row = await connection.query(sql);

      if (row[0].length !== 0) {
        res.status(200).json({
          success: true,
          result: row[0][0].isAdmin,
          msg: "성공",
        });
      } else {
        res.status(200).json({
          success: true,
          msg: "해당 path가 없음",
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
  setIsAdmin: async (req, res) => {
    const { path, nation, isAdmin } = req.body;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE menu SET isAdmin=${isAdmin} WHERE path='${path}'`;

      await connection.query(sql);

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
module.exports = menuCtrl;
