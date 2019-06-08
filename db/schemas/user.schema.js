const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = require('mongoose').Schema;

const User = new Schema({
  method: String,
  roles: {
    type: String,
    enum: ['user', 'admin']
  },
  local: {
    username: { type: String, unique: true },
    salt: String,
    hashedPassword: String
  },
  hash: String,
  salt: String,
  refreshToken: String,
  subId: Number,
  subs: []
});

module.exports = User;
