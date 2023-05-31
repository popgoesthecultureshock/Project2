const express = require('express')
const router = express.Router()
const notesCtrl = require('../controllers/notes')

router.post('/dreams/:id/notes', notesCtrl.createNote)
router.delete('/notes/:id', notesCtrl.deleteNote)

module.exports = router
