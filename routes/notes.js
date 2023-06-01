const express = require('express')
const router = express.Router()
const notesCtrl = require('../controllers/notes')

router.post('/details/:id', notesCtrl.createNote)
router.delete('/details/:id', notesCtrl.deleteNote)

module.exports = router
