const Dream = require('../models/dream')

const createNote = async (req, res) => {
  const dream = await Dream.findById(req.params.id)
  req.body.user = req.user._id
  req.body.userName = req.user.name
  req.body.userAvatar = req.user.avatar
  dream.notes.push(req.body)
  try {
    // Save any changes made to the movie doc
    await dream.save()
  } catch (err) {
    console.log(err)
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/dreams/details/${dream._id}`)
}

const deleteNote = (req, res, next) => {
  Dream.findOne({
    'notes._id': req.params.id,
    'notes.user': req.user._id
  }).then(function (dream) {
    if (!dream) return res.redirect('/dreams')
    dream.notes.remove(req.params.id)
    dream
      .save()
      .then(function () {
        res.redirect(`/dreams/details/${dream._id}`)
      })
      .catch(function (err) {
        return next(err)
      })
  })
}

module.exports = {
  createNote,
  deleteNote
}
