const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const db = require('../models');
const config = require('../config/auth.config');

exports.createUser = async (req, res) => {
  try {
    const user = await db.users.create({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        'secret key 123'
      ).toString(),
      dob: req.body.dob,
    });
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 43200,
    });
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.authUser = async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(404).send({ message: 'User is Not found.' });
    }
    const decryptPassword = CryptoJS.AES.decrypt(
      user.password,
      'secret key 123'
    ).toString(CryptoJS.enc.Utf8);
    if (decryptPassword !== req.body.password) {
      res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 43200,
    });
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await db.users.findOne({ where: { id: req.params.id } });
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await db.users.findOne({ where: { id: req.params.id } });
    const newUser = await user.update({
      email: req.body.email,
    });
    res.json(newUser);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await db.users.findOne({ where: { id: req.params.id } });
    await user.destroy();
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: 'User is not found' });
  }
};
