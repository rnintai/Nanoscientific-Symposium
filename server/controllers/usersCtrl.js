const {asiaPool} = require('../dbConfigPool');
const hasher = require('wordpress-hash-node');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const { router } = require('../routes/usersRouter');

const usersCtrl = {
  login: async (req, res, next) => {
    const connection = await asiaPool.getConnection(async conn => conn);

    const userEmail = req.body.email;
    const userPw = req.body.password;

    let checked = false; 

    try{
      const sql = `SELECT email, password FROM user WHERE email='${userEmail}'`;

      const result = await connection.query(sql);

      let dbPassword = result[0][0].password; // 해쉬화 된 db상의 wordpress 비밀번호
      checked = hasher.CheckPassword(userPw, dbPassword);
      connection.release();
    } catch(error){
      await connection.rollback();
      connection.release();
      throw error;
    } 

    if(checked){
      // refresh토큰 생성 및 db에 저장
      let refreshToken = jwt.sign({},
        process.env.JWT_SECRET,
        { expiresIn: '14d' });
      const insertSql = `UPDATE user SET refresh_token='${refreshToken}' WHERE email='${userEmail}'`;
      try {
        await connection.beginTransaction();
        await connection.query(insertSql);
        
        res.status(200).json({result: true});
        await connection.commit();
        connection.release();

        // access토큰 생성
        
        // 두 개의 토큰을 client 쿠키에 저장
      } catch(error) {
        await connection.rollback();
        connection.release();
        throw error;
      }
    } else{
      res.status(400).json({
        result: false,
        message: "user info not match."
      });
    }

    // asiaPool.query(sql, (error, rows) => {
    //   if (error) throw error;
    //   let dbPassword = rows[0].password; // 해쉬화 된 db상의 wordpress 비밀번호
    //   let checked = hasher.CheckPassword(userPw, dbPassword);

    //   if(checked){
    //     // refresh토큰 생성 및 db에 저장
    //     let refreshToken = jwt.sign({},
    //       process.env.JWT_SECRET,
    //       { expiresIn: '14d' });
    //     const insertSql = `UPDATE user SET refresh_token='${refreshToken}' WHERE email='${userEmail}'`;
    //     asiaPool.query(insertSql, (error, rows) => {
    //       if (error) throw error;
    //       console.log(rows);
    //       res.status(200).json({result: true});
    //       // 
    //     });
    //   } else{
    //     res.status(400).json({
    //       result: false
    //     });
    //   }
    // });

  },
};

module.exports = usersCtrl;
