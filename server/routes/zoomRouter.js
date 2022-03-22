const router = require("express").Router();
const zoomCtrl = require("../controllers/zoomCtrl");

/**
 * @swagger
 *  /api/zoom/webinar/list:
 *    get:
 *      tags:
 *      - Zoom
 *      description: 계정의 Webinar 목록을 받아옵니다.
 *      responses:
 *        '200':
 *          description: successful operation
 */
router.get("/webinar/list", zoomCtrl.getWebinarList);

/**
 * @swagger
 *  /api/zoom/webinar/registrant/questions/{webinarId}:
 *    get:
 *      tags:
 *      - Zoom
 *      description: Webinar Id의 register question 목록을 받아옵니다.
 *      parameters:
 *        - in: path
 *          name: webinarId
 *          required: true
 *          schema:
 *            type: integer
 *          description: webinar ID
 *      responses:
 *        '200':
 *          description: successful operation
 */
router.get(
  "/webinar/registrant/questions/:webinarId",
  zoomCtrl.getRegistrationQuestions
);

module.exports = router;
