const hasher = require("wordpress-hash-node");
const { issueAccessToken, issueRefreshToken } = require("../utils/jwt");
const { getCurrentPool } = require("../utils/getCurrentPool");

const usersCtrl = {
  login: async (req, res, next) => {
    const currentPool = getCurrentPool(req);

    const connection = await currentPool.getConnection(async (conn) => conn);

    const userEmail = req.body.email;
    const userPw = req.body.password;

    let checked = false;

    try {
      const sql = `SELECT email, password, role FROM user WHERE email='${userEmail}'`;

      const result = await connection.query(sql);
      if (result[0].length) {
        let dbPassword = result[0][0].password; // 해쉬화 된 db상의 wordpress 비밀번호
        checked = hasher.CheckPassword(userPw, dbPassword);
        role = result[0][0].role;
      }
      connection.release();
    } catch (error) {
      await connection.rollback();
      connection.release();
      res.status(500).json({ error });
      throw error;
    }

    if (checked) {
      // refresh토큰 생성 및 db에 저장
      let refreshToken = issueRefreshToken(userEmail);
      const insertSql = `UPDATE user SET refresh_token='${refreshToken}' WHERE email='${userEmail}'`;
      try {
        await connection.beginTransaction();
        await connection.query(insertSql);

        await connection.commit();
        connection.release();

        // access토큰 생성
        let accessToken = issueAccessToken(userEmail);

        // 쿠키 세팅
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
        });

        res.status(200).json({
          success: true,
          message: "login success",
          accessToken,
          role,
        });
      } catch (error) {
        await connection.rollback();
        connection.release();
        res.status(500).json({ error });
        throw error;
      }
    } else {
      res.status(200).json({
        success: false,
        message: "user info not match.",
      });
    }
  },

  logout: async (req, res) => {
    const currentPool = getCurrentPool(req);

    const connection = await currentPool.getConnection(async (conn) => conn);

    const userEmail = req.body.email;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(200).json({
        success: false,
        message: "Refresh token not exists in client",
      });
      return;
    }
    try {
      const sql = `UPDATE user SET refresh_token='' 
      WHERE email='${userEmail}' AND refresh_token='${refreshToken}'`;

      const result = await connection.query(sql);
      // if (result[0].changedRows === 0) {
      //   res.status(200).json({
      //     success: true,
      //     message: "Already logged out",
      //   });
      // } else {
      res.cookie("refreshToken", "", {
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Successfully logged out",
      });
      // }
      connection.release();
    } catch (error) {
      await connection.rollback();
      connection.release();
      res.status(500).json({ error });
      throw error;
    }
  },
};

module.exports = usersCtrl;
