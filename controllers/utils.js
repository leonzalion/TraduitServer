const bcrypt = require('bcrypt');
const User = require('../models/User');
const to = require('await-to-js').default;
const atob = require('atob');

async function getUser(req) {
  let Authorization = req.headers['authorization'];
  let [username, password] = atob(Authorization.replace('Basic ', '')).split(':');
  const [userError, user] = await to(User.findOne({username})
  .select('+password').exec());
  if (userError) return Promise.reject(userError);
  const match = await bcrypt.compare(password, user.password);
  if (!match) return Promise.reject({
    message: "Invalid username or password."
  });
  const {password: _, ...userWithoutPassword} = user._doc;
  return Promise.resolve(userWithoutPassword);
}

module.exports = {
  getUser
};
