const router = require("express").Router();
const zoomCtrl = require("../controllers/zoomCtrl");
const zoomMiddle = require("../middlewares/zoomMiddle");

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
router.get("/webinar/list", zoomMiddle.getZoomToken, zoomCtrl.getWebinarList);

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
  zoomMiddle.getZoomToken,
  zoomCtrl.getRegistrationQuestions
);

/**
 * @swagger
 *  /api/zoom/webinar/registrants/{webinarId}:
 *    post:
 *      tags:
 *      - Zoom
 *      description: webinarId에 registrant 추가
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: array
 *            example: [{
 *              "id": 1,
 *              "next_id": 2,
 *              },{
 *              "id":2,
 *              "next_id": 3,
 *            }]
 *      responses:
 *        '200':
 *          description: successful operation
 */

router
  .route("/webinar/registrants/:webinarId")
  .get(zoomMiddle.getZoomToken, zoomCtrl.getRegistrantLink)
  .post(zoomMiddle.getZoomToken, zoomCtrl.addRegistrant);

router.post(
  "/webinar/registrant/fetch",
  zoomMiddle.getZoomToken,
  zoomCtrl.fetchRegistrantId
);

router.post("/webinar", zoomMiddle.getZoomToken, zoomCtrl.addWebinar);
router
  .route("/webinar/:webinarId")
  .get(zoomMiddle.getZoomToken, zoomCtrl.getWebinar)
  .delete(zoomMiddle.getZoomToken, zoomCtrl.removeWebinar);

router.get("/meeting/list", zoomMiddle.getZoomToken, zoomCtrl.getMeetingList);

module.exports = router;
