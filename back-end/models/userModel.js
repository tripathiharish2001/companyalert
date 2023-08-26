const mongoose = require("mongoose");
const bcrytpt = require("bcrypt");
const validator = require("validator");
// using bscript
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation

  if (!email || !password) {
    throw Error("All field must be filled!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("At least 8 characters — including at least one uppercase letter,one number and one special character");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrytpt.genSalt(10);
  const hash = await bcrytpt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled!");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User not found!");
  }

  const match = await bcrytpt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

// static login

module.exports = mongoose.model("User", userSchema);
