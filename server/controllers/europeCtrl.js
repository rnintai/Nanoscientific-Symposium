const { europeConnection } = require("../dbConfig");
const path = require("path");

const europeCtrl = {
  getLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/europe/landing.html"));
  },
  saveTransaction: async (req, res) => {
    const { id, userId } = req.body;

    const sql = `INSERT INTO transaction(id,user_id) VALUES('${id}',${userId})`;

    europeConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },
  deleteTransaction: async (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM transaction WHERE id='${id}'`;
    europeConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },
  register: async (req, res) => {
    const {
      email,
      password,
      title,
      university,
      institute,
      street,
      zipCode,
      city,
      researchField,
      afmTool,
      nanoMechanical,
      characterizationOfSoft,
      advancedImaging,
      highResolutionImaging,
      automationInAfm,
      lastName,
      firstName,
    } = req.body;

    const sql = `INSERT INTO user(email,password,title,university,institute,street,zipCode,city,research_field,afm_tool,nanomechanical,characterization_of_soft,advanced_imaging,high_resolution_imaging,last_name,first_name)
 VALUES('${email}','${password}','${title}','${university}','${institute}','${street}','${zipCode}','${city}','${researchField}','${afmTool}',${nanoMechanical},${characterizationOfSoft},${advancedImaging},${highResolutionImaging},${automationInAfm},'${lastName}',${firstName})`;

    europeConnection.query(sql, (error, rows) => {
      if (error) throw error;
      res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },
};

module.exports = europeCtrl;
