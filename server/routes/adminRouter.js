const adminCtrl = require("../controllers/adminCtrl");
const router = require("express").Router();

// page

router
  .route("/session")
  .post(adminCtrl.addSession)
  .put(adminCtrl.modifySession);

router
  .route("/program")
  .post(adminCtrl.addProgram)
  .put(adminCtrl.modifyProgram);

router
  .route("/speaker")
  .post(adminCtrl.addSpeaker)
  .put(adminCtrl.modifySpeaker);

router.route("/hideProgram").get(adminCtrl.getHideProgram);
router.route("/hideSession").get(adminCtrl.getHideSession);

router.route("/showProgram").put(adminCtrl.showProgram);
router.route("/showSession").put(adminCtrl.showSession);

router.route("/hideSpeaker").get(adminCtrl.getHideSpeaker);
router.route("/showSpeaker").put(adminCtrl.showSpeaker);

router.route("/users").get(adminCtrl.getUsers);

module.exports = router;
