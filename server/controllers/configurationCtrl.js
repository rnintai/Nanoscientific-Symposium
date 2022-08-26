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

  setConfig: async (req, res) => {
    const { nation, config } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    const { alert_receive_email } = config;

    try {
      const sql = `UPDATE configuration SET
      ${
        alert_receive_email
          ? `alert_receive_email = "${alert_receive_email}"`
          : ""
      }
      WHERE id='1';
      `;
      await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
        message: "config 저장 성공",
      });
    } catch (err) {
      connection.release();
      res.status(400).json({
        success: false,
        err,
      });
    }
  },
};
module.exports = configurationCtrl;
