const Dream = require('../models/dream')
const User = require('../models/user')

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

const createDream = async (req, res) => {
  try {
    const dream = await Dream.create(req.body)
    console.log('THIS IS THE DREAM', dream)
    const person = req.user._id
    const user = await User.find({ _id: person })
    console.log('THIS IS THE USER', user)
    user.dreams.push(dream)
    user.save()
    // console.log('THIS IS THE USER', user)
    res.redirect(`/dreams/`)
  } catch (err) {
    console.log(err)
    res.render('dreams/new', { errorMsg: err.message })
  }
}

module.exports = {
  index,
  new: newDream,
  createDream
}
