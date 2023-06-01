const Dream = require('../models/dream')
const User = require('../models/user')

const index = async (req, res) => {
  const dreams = await Dream.find({})
  res.render('dreams/index', { title: 'Dream DB', dreams })
}

const newDream = (req, res) => {
  try {
    res.render('dreams/new', { title: 'Add Dream' })
  } catch (err) {
    res.redirect('/index')
    console.log(err, 'newDream Controller Not Working')
  }
}

const createDream = async (req, res) => {
  try {
    const dream = await Dream.create(req.body)
    const person = req.user._id
    const user = await User.findById(person)
    user.dreams.push(dream._id)
    user.save()
    res.redirect('/users/profile')
  } catch (err) {
    console.log(err)
    res.render('dreams/new', { errorMsg: err.message })
  }
}

const deleteDream = async (req, res) => {
  await Dream.findByIdAndDelete(req.params.id)
  res.redirect('/users/profile')
}

const showDream = async (req, res) => {
  //GET Dream from DB
  let dream = await Dream.findById(req.params.id)
  //Render the page
  res.render('dreams/show', { dream })
}

module.exports = {
  index,
  new: newDream,
  createDream,
  deleteDream,
  showDream
}
