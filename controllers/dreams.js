const Dream = require('../models/dream')

const index = async (req, res) => {
  const dreams = await Dream.find({})
  res.render('dreams/index', { title: 'Dream DB', dreams })
}

const newDream = (req, res) => {
  res.render('dreams/new', { title: 'Add Dream' }).catch((err) => {
    res.redirect('/index')
    console.log(err, 'newDream Controller Not Working')
  })
}

module.exports = {
  index,
  new: newDream
}
