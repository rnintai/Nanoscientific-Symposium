const { getCurrentPool } = require("../utils/getCurrentPool");

const announcementReadCtrl = {
  getPostByUserID: async (req, res) => {
    const { nation, id } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const annoucementReadSQL = `SELECT user_id, announcement_id FROM announcement_read WHERE user_id=${id}`;
      const annoucementSQL = `SELECT id FROM announcement`;

      const annoucenmentReadData = await connection.query(annoucementReadSQL);
      const announcementData = await connection.query(annoucementSQL);
      connection.release();
      if (
        annoucenmentReadData[0].length !== 0 &&
        announcementData[0].length !== 0
      ) {
        res.status(200).json({
          success: true,
          result:
            announcementData[0].filter((el) =>
              annoucenmentReadData[0]
                .map((rEl) => rEl.announcement_id)
                .includes(el.id)
            ).length < 1
              ? true
              : false,
          msg: "성공",
        });
      } else {
        res.status(200).json({
          success: true,
          msg: "annoucementRead 혹은 annoucement의 데이터가 존재하지 않습니다.",
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
