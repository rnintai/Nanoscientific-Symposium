const {asiaConnection} = require('../dbConfigPool');
const hasher = require('wordpress-hash-node');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const usersCtrl = {
  login: async (req, res, next) => {
    const userEmail = req.body.email;
    const userPw = req.body.password;

    const sql = `SELECT email, password FROM user WHERE email='${userEmail}'`;
    asiaConnection.query(sql, (error, rows) => {
      if (error) throw error;
      let dbPassword = rows[0].password; // 해쉬화 된 db상의 wordpress 비밀번호
      let checked = hasher.CheckPassword(userPw, dbPassword);

      if(checked){
        // refresh토큰 생성 및 db에 저장
        let refreshToken = jwt.sign({},
          process.env.JWT_SECRET,
          { expiresIn: '14d' });
        const insertSql = `UPDATE user SET refresh_token='${refreshToken}' WHERE email='${userEmail}'`;
        asiaConnection.query(insertSql, (error, rows) => {
          if (error) throw error;
          console.log(rows);
          res.status(200).json({result: true});
          // 
        });
      } else{
        res.status(400).json({
          result: false
        });
      }
    });

  },
};

module.exports = usersCtrl;
