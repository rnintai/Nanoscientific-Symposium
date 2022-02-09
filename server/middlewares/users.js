const {
  verifyToken,
  issueAccessToken,
  issueRefreshToken,
} = require("../utils/jwt");

module.exports = {
  checkToken: async (req, res, next) => {
    const accessToken = verifyToken(req.body.accessToken);
    const refreshToken = verifyToken(req.cookies.refreshToken);

    // console.log(accessToken);
    // console.log(refreshToken);

    if (accessToken === null) {
      if (refreshToken === null) {
        // case 1: 둘다 만료 -> 로그아웃
        res.status(401).json({ success: false, message: "token is expired" });
      } else {
        // case 2: access 만료, refresh 살아있음 -> access 재발급
        let newAccessToken = issueAccessToken(refreshToken.userEmail);
        res.status(200).json({
          success: true,
          message: "access token is reissued",
          accessToken: newAccessToken,
        });
        // next("newAccessToken");
        // next();
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
        // case 4: 문제 없음
        next();
      }
    }
  },
};
