const { getCurrentPool } = require("../utils/getCurrentPool");
const nodemailer = require("nodemailer");
const vCode = require("../utils/verificationCode");
const mailHTML = require("../utils/mailTemplates");

const S3_URL = "https://d3gxipca0cw0l2.cloudfront.net";

const mailCtrl = {
  sendVcode: async (req, res) => {
    const { email, nation, year } = req.body;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const [code, token] = vCode.create(email);

      const sql = `INSERT INTO email_verification (email, token)
      VALUES ("${email}","${token}")
      ON DUPLICATE KEY UPDATE
      token="${token}"`;

      const row = await connection.query(sql);
      connection.release();

      const transporter = nodemailer.createTransport({
        debug: true,
        port: 587,
        host: "smtp.ionos.com",
        secure: false,
        requireTLS: true,
        // tls: {
        //   ciphers: "SSLv3",
        // },
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: `${year} Nanoscientific ${
          nation === "eu" ? "Forum" : "Symposium"
        } <event@nanoscientific.org>`,
        to: email,
        subject: `[${code}] Verification Code`,
        html: mailHTML.forgotPasswordHTML("Reset Your Password", code),
      });

      // info.accepted: [], info.rejected: [].
      // length를 통해 성공 실패 여부 판단 가능.
      if (info.accepted.length === 1) {
        res.status(200).json({
          success: true,
          result: true,
          msg: "메일 전송 성공",
        });
      } else {
        res.status(200).json({
          success: true,
          result: false,
          msg: "메일 전송 실패",
        });
      }
      // }
      // else {
      //   res.status(200).json({
      //     success: true,
      //     result: false,
      //     msg: "이메일에 해당하는 유저 없음",
      //   });
      // }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    } finally {
      connection.release();
    }
  },

  checkVcode: async (req, res) => {
    const { email, code, nation } = req.body;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT token from email_verification WHERE email="${email}"`;
      const row = await connection.query(sql);
      connection.release();

      const { token } = row[0][0];
      const isCorrect = vCode.check(code, token);
      if (isCorrect) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(200).json({
          success: false,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        msg: err,
      });
    }
  },

  sendAbstractAlert: async (req, res) => {
    const { email, attachments, nation, formData, year, isFailed } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    const {
      psAbstractTitle,
      abstractDescription,
      Salutation,
      FirstName,
      LastName,
      Company,
      Department,
      Email,
      Phone,
      Country,
      State,
      psApplications,
      psExistingAFMBrand,
      psPresentationForm,
    } = formData;

    let attachmentArr = [];
    if (attachments && attachments.length !== 0) {
      for (let attachment of attachments) {
        attachmentArr.push({
          filename: attachment.name,
          path: encodeURI(`${S3_URL}/${attachment.path}`),
        });
      }
    }

    try {
      const transporter = nodemailer.createTransport({
        debug: true,
        port: 587,
        host: "smtp.ionos.com",
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS,
        },
      });

      let info;
      // if (!isFailed) {
      //   info = await transporter.sendMail({
      //     from: `${year} NANOscientific ${
      //       nation === "eu" ? "Forum" : "Symposium"
      //     } <event@nanoscientific.org>`,
      //     to: email,
      //     subject: `[${nation.toUpperCase()}] Abstract Submission: (${psPresentationForm}) ${psAbstractTitle}`,
      //     html: mailHTML.abstractMailHTML(formData, year),
      //     attachments: attachmentArr,
      //   });
      // } else {
      info = await transporter.sendMail({
        from: `${year} NANOscientific ${
          nation === "eu" ? "Forum" : "Symposium"
        } <event@nanoscientific.org>`,
        to: email,
        subject: `[${nation.toUpperCase()}] Abstract Submission: (${psPresentationForm}) ${psAbstractTitle}`,
        html: mailHTML.abstractMailHTML(formData, year, attachments),
      });
      // }

      // info.accepted: [], info.rejected: [].
      // length를 통해 성공 실패 여부 판단 가능.
      if (info.accepted.length > 0) {
        res.status(200).json({
          success: true,
          result: true,
          msg: "메일 전송 성공",
        });
      } else {
        res.status(200).json({
          success: true,
          result: false,
          msg: "메일 전송 실패",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    } finally {
      connection.release();
    }
  },

  getIsAdmin: async (req, res) => {
    const { path, nation } = req.body;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT is_published FROM menu WHERE path='${path}'`;

      const row = await connection.query(sql);
      connection.release();

      if (row[0].length !== 0) {
        res.status(200).json({
          success: true,
          result: row[0][0].is_published,
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
  sendRegistrationAlert: async (req, res) => {
    const { email, attachments, nation, formData, year } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const transporter = nodemailer.createTransport({
        debug: true,
        port: 587,
        host: "smtp.ionos.com",
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS,
        },
      });

      let info;
      info = await transporter.sendMail({
        from: `${year} NANOscientific ${
          nation === "eu" ? "Forum" : "Symposium"
        } <event@nanoscientific.org>`,
        to: email,
        subject: `[${nation.toUpperCase()}] Registration Alert`,
        html: mailHTML.registrationAlertHTML(formData, year),
      });

      // info.accepted: [], info.rejected: [].
      // length를 통해 성공 실패 여부 판단 가능.
      if (info.accepted.length > 0) {
        res.status(200).json({
          success: true,
          result: true,
          msg: "메일 전송 성공",
        });
      } else {
        res.status(200).json({
          success: true,
          result: false,
          msg: "메일 전송 실패",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    } finally {
      connection.release();
    }
  },
};
module.exports = mailCtrl;
