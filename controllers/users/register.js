const User = require('../../models/User');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {username, password} = req.body;
  console.log(req.body);

  const [userError, user] = await to(User.create({
    username, password
  }));
  if (userError) {
    console.log(userError);
    return res.json(userError);
  }
  return res.json({success: true, data: user});
};