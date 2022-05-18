const announcementCtrl = require("../controllers/announcementCtrl");
const router = require("express").Router();

router.route("/list").get(announcementCtrl.getPostList);
router
  .route("/post")
  .get(announcementCtrl.getPostById)
  .post(announcementCtrl.addPost)
  .delete(announcementCtrl.deletePost);

module.exports = router;
