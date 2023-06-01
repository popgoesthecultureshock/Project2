var express = require('express')
var router = express.Router()
const dreamsCtrl = require('../controllers/dreams')
// const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/new', dreamsCtrl.new)
//GET /dreams
router.get('/', dreamsCtrl.index)
//POST ppost dreams to profile
router.post('/', dreamsCtrl.createDream)

router.delete('/:id', dreamsCtrl.deleteDream)

module.exports = router
