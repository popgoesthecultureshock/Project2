const Dream = require('../models/dream')
const User = require('../models/user')

const renderProfile = async (req, res) => {
  const person = req.user._id
  const user = await User.find({ _id: person }).populate('dreams')
  console.log(user)
  res.render('dreams/profile', { title: `${user.name}`, user })
}

module.exports = {
  renderProfile
}
