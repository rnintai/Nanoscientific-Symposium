const { getCurrentPool } = require("../utils/getCurrentPool");

const abstractCtrl = {
  getSubmissions: async (req, res) => {
    const { nation,year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `
      SELECT * from abstract_submission ${
        year && year !== "2022" ? ` WHERE year="${year}"` : ` WHERE year IS NULL`
      };
      `;
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
        result: row[0],
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(200).json({
        success: false,
        err,
      });
    }
  },
  submitAbstract: async (req, res) => {
    const {
      nation,
      abstract_title,
      salutation,
      first_name,
      last_name,
      institution,
      department,
      email,
      phone,
      country,
      state,
      application,
      afm_model,
      presentation_form,
      pdf_file_path,
      year,
    } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `
      INSERT INTO abstract_submission
      (
        abstract_title,
        salutation,
        first_name,
        last_name,
        institution,
        department,
        email,
        phone,
        country,
        state,
        application,
        afm_model,
        presentation_form,
        pdf_file_path,
        year
      ) VALUES 
      (
        '${abstract_title}',
        '${salutation}',
        '${first_name}',
        '${last_name}',
        '${institution}',
        '${department}',
        '${email}',
        '${phone}',
        '${country}',
        '${state}',
        '${application}',
        '${afm_model}',
        '${presentation_form}',
        '${pdf_file_path}',
        '${year}'
      )
      `;
      const result = await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
        result,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(200).json({
        success: false,
        err,
      });
    }
  },
};
module.exports = abstractCtrl;
