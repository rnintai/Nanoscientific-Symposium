const router = require("express").Router();
const usersCtrl = require("../controllers/usersCtrl");
const usersMid = require("../middlewares/users");

router.post("/login", usersCtrl.login);
router.post("/check", usersMid.checkToken, async (req, res) => {
  let resObj = {
    success: true,
    message: "success",
  };
  res.status(200).json(resObj);
});

module.exports = router;
