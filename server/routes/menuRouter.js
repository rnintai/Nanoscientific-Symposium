const menuCtrl = require("../controllers/menuCtrl");
const router = require("express").Router();

/**
 * @swagger
 *  /api/menu/admin:
 *    post:
 *      tags:
 *      - Menu
 *      description: menu의 item을 모두 불러옵니다.
 *      parameters:
 *        - name: id
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "us",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/admin/list").post(menuCtrl.getMenuList);
/**
 * @swagger
 *  /api/menu/admin:
 *    post:
 *      tags:
 *      - Menu
 *      description: menu의 isAdmin 값을 조회합니다.
 *      parameters:
 *        - name: path
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *          description: subpath name
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *          description: nation code
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/admin").post(menuCtrl.getIsAdmin);
/**
 * @swagger
 *  /api/menu/admin:
 *    put:
 *      tags:
 *      - Menu
 *      description: menu의 isAdmin 값을 변경해줍니다..
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "path": "/us/programs",
 *              "nation": "us",
 *              "isAdmin": 1
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/admin").put(menuCtrl.setIsAdmin);

module.exports = router;
