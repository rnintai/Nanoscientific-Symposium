const { getCurrentPool } = require("../utils/getCurrentPool");
const { issueZoomToken } = require("../utils/jwt");

const zoomMiddle = {
  getZoomToken: async (req, res, next) => {
    const nation = req.query.nation || req.body.nation;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection((conn) => conn);

    try {
      const sql = `
      SELECT zoom_email, zoom_api_key, zoom_api_secret from configuration;
      `;

      const row = await connection.query(sql);

      const { zoom_email, zoom_api_key, zoom_api_secret } = row[0][0];

      res.locals.zoom_email = zoom_email;
      res.locals.zoom_token = issueZoomToken(zoom_api_key, zoom_api_secret);

      next();
    } catch (err) {
      connection.release();
      res.status(400).json({ success: false, err });
    }
  },
};

module.exports = zoomMiddle;
