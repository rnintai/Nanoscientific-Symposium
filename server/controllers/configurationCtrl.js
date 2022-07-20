const { getCurrentPool } = require("../utils/getCurrentPool");

const configurationCtrl = {
  getConfig: async (req, res) => {
    const { nation } = req.query;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `
      SELECT * FROM configuration
      `;
      const result = await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
        result: result[0][0],
      });
    } catch (err) {
      console.log(err);
      res.status(200).json({
        success: false,
        err,
      });
    } finally {
      connection.release();
    }
  },
};
module.exports = configurationCtrl;
