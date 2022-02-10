const { asiaPool } = require("../dbConfigPool");
const {
  verifyToken,
  issueAccessToken,
  issueRefreshToken,
} = require("../utils/jwt");

module.exports = {
  checkToken: async (req, res, next) => {
    const accessToken = verifyToken(req.body.accessToken);
    const refreshToken = verifyToken(req.cookies.refreshToken);

    if (accessToken === null) {
      if (refreshToken === null) {
        // case 1: 둘다 만료 -> 로그아웃
        res.status(200).json({ success: false, message: "token is expired" });
      } else {
        // case 2: access 만료, refresh 살아있음 -> access 재발급
        let newAccessToken = issueAccessToken(refreshToken.email);
        // 다음 미들웨어에서 접근하기 위한 전역 변수로 지정
        res.locals.accessToken = newAccessToken;
        next();
      }
    } else {
      if (refreshToken === null) {
        // case 3: access 살아있음, refresh 만료 -> refresh 재발급
        let newRefreshToken = issueRefreshToken(accessToken.email);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
        });
        next();
      } else {
        res.locals.accessToken = req.body.accessToken;
        next();
      }
    }
  },

  readUser: async (req, res, next) => {
    const accessToken = verifyToken(res.locals.accessToken);
    const connection = await asiaPool.getConnection(async (conn) => conn);

    try {
      const sql = `SELECT  
      role
      FROM user 
      WHERE email="${accessToken.email}"`;

      const result = await connection.query(sql);

      res.locals.email = accessToken.email;
      res.locals.role = result[0][0].role;
      connection.release();
      next();
    } catch (err) {
      connection.release();
      res.status(200).json({
        success: true,
      });
    }
  },
};
