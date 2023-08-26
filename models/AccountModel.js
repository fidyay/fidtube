/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const accountSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  subscribtions: {
    type: [Schema.Types.ObjectId],
  },
});

const AccountModel = model("Account", accountSchema);

module.exports = AccountModel;
