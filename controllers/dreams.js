const Dream = require('../models/dream')

const index = async (req, res) => {
  const dreams = await Dream.find({})
  res.render('dreams/index', { title: 'Dream DB', dreams })
}

const newDream = (req, res) => {
  res.render('dreams/new', { title: 'Add Dream', errorMsg: '' })
}

module.exports = {
  index,
  newDream
}
