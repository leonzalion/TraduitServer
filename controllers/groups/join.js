const Group = require('../../models/Group');
const to = require('await-to-js').default;
const {getUser} = require('../utils');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const [userError, user] = await to(getUser(req));
  if (userError) return res.status(400).json(userError);
  const {name, password} = req.body;
  const [groupError, group] = await to(Group.findOne({name}).select('+password').exec());
  if (groupError) return res.status(400).json(groupError);
  if (!bcrypt.compare(group.password, password)) {
    return res.status(400).json({message: "Invalid username or password."});
  }
  const [updatedGroup, groupUpdateError] = await to(Group.findOneAndUpdate(
    {name}, {$push: {groups: user._id}}, {new: true}
  ));
  if (groupUpdateError) return res.status(400).json(groupUpdateError);
  return res.json(updatedGroup);
};