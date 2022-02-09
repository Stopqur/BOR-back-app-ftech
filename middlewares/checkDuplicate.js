const db = require("../models");

const checkDuplicate = async(req, res, next) => {
  try {
    const user = await db.users.findOne({
      where: {
        username: req.body.username
      }
    })
    if (user) {
      return res.status(400).json({
        message: "User with this name is exist!"
      });
    }
  
    const userByEmail = await db.users.findOne({
      where: {
        email: req.body.email
      }
    })
    if (userByEmail) {
      res.status(400).send({
        message: "User with this email is exist!"
      });
      return;
    }
    next()
  } catch(e) {
    res.status(400).json({ sdsd: e })
  }
};

module.exports = checkDuplicate