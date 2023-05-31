var express = require('express')
var router = express.Router()
const dreamsCtrl = require('../controllers/dreams')
// const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/new', dreamsCtrl.new)
//GET /dreams
router.get('/', dreamsCtrl.index)

module.exports = router
