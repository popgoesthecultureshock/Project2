const Dream = require('../models/dream')
const User = require('../models/user')

const renderProfile = async (req, res) => {
  const user = await User.find({ _id: req.user._id }).populate('dreams')
  console.log(user)
  res.render('dreams/profile', { title: `${user.name}`, user })
}

module.exports = {
  renderProfile
}
