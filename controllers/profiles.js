const Dream = require('../models/dream')
const User = require('../models/user')

const renderProfile = async (req, res) => {
  const person = req.user._id
  const user = await User.findOne({ _id: person }).populate('dreams')
  user.dreams.sort((a, b) => Number(b.date) - Number(a.date))
  console.log(user)
  res.render('dreams/profile', { title: `${user.name}`, user })
}

module.exports = {
  renderProfile
}

//date .sort came from https://bobbyhadz.com/blog/javascript-sort-array-of-objects-by-date-property *with tweaking
