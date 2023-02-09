const { getCurrentPool } = require("../utils/getCurrentPool");

const announcementReadCtrl = {
  getPostByUserID: async (req, res) => {
    const { nation, id,year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const annoucementReadSQL = `SELECT user_id, announcement_id FROM announcement_read WHERE user_id=${id} and${
        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
      };`;
      const annoucementSQL = `SELECT id FROM announcement${
        year && year !== "2022" ? ` WHERE year="${year}"` : ` WHERE year IS NULL`
      };`;
      const announcementReadData = await connection.query(annoucementReadSQL);
      const announcementData = await connection.query(annoucementSQL);
      const readDataLen = announcementReadData[0].length;
      const dataLen = announcementData[0].length;
      connection.release();
      if (
        // 읽을 것도 있으며 읽은 기록이 있는 경우
        readDataLen !== 0 &&
        dataLen !== 0
      ) {
        res.status(200).json({
          success: true,
          result:
            announcementData[0].filter((el) =>
              announcementReadData[0]
                .map((rEl) => rEl.announcement_id)
                .includes(el.id)
            ).length === dataLen
              ? true
              : false,
          unread: announcementData[0]
            .filter(
              (el) =>
                !announcementReadData[0]
                  .map((rEl) => rEl.announcement_id)
                  .includes(el.id)
            )
            .map((el) => el.id),
          msg: "성공",
        });
      } else if (readDataLen === 0 && dataLen !== 0) {
        // 읽을 것은 있지만 읽은 데이터가 없는 경우
        res.status(200).json({
          success: true,
          result: false,
          unread: announcementData[0].map((el) => el.id),
          msg: "읽을 것은 있지만 읽은 데이터가 없는 경우",
        });
      } else if (dataLen === 0) {
        // 읽을 것과 읽은 데이터 모두 없는 경우
        res.status(200).json({
          success: true,
          result: false,
          unread: announcementData[0].map((el) => el.id),
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
  addReadPostInfo: async (req, res) => {
    const { nation, userId, announcementId, year} = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      let sql = `INSERT IGNORE INTO announcement_read (user_id, announcement_id, year) VALUES ('${userId}', '${announcementId}', '${year&& year!=="2022" ? year : null}')`;
      await connection.query(sql);
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
  deleteReadPostInfo: async (req, res) => {
    const { nation, announcementId,year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `DELETE FROM announcement_read WHERE announcement_id=${announcementId} and${
        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
      }; `;
      await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
        msg: "성공",
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(400).json({
        success: false,
        msg: err,
      });
    }
  },
};

module.exports = announcementReadCtrl;
