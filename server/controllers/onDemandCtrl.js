const { getCurrentPool } = require("../utils/getCurrentPool");

const onDemandCtrl = {
  getOnDemandList: async (req, res) => {
    const currentPool = getCurrentPool("common");
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `
      SELECT * FROM on_demand;
      `;
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        result: row[0],
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  editOnDemandList: async (req, res) => {
    const currentPool = getCurrentPool("common");
    const connection = await currentPool.getConnection(async (conn) => conn);
    const {
      id,
      title,
      speaker,
      affiliation,
      abstractDesc,
      region,
      year,
      language,
      thumbnail,
      video,
      application,
    } = req.body;

    try {
      let sql;
      if (id) {
        sql = `
          UPDATE on_demand SET 
            title='${title}',
            speaker='${speaker}',
            affiliation='${affiliation}',
            abstract_desc='${abstractDesc}',
            region='${region}',
            year='${year}',
            language='${language}',
            thumbnail='${thumbnail}',
            video='${video}',
            application='${application}'
          WHERE id=${id};
        `;
      } else {
        sql = `
        INSERT INTO on_demand (
          title,
          speaker,
          affiliation,
          abstract_desc,
          region,
          year,
          language,
          thumbnail,
          video,
          application
        ) VALUES (
          '${title}',
          '${speaker}',
          '${affiliation}',
          '${abstractDesc}',
          '${region}',
          '${year}',
          '${language}',
          '${thumbnail}',
          '${video}',
          '${application}'
        );
        `;
      }

      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        result: row[0],
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  deleteOnDemandList: async (req, res) => {
    const currentPool = getCurrentPool("common");
    const connection = await currentPool.getConnection(async (conn) => conn);

    const { id } = req.query;
    try {
      const sql = `
      DELETE FROM on_demand WHERE id=${id};
      `;
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        result: row[0],
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
};

module.exports = onDemandCtrl;
