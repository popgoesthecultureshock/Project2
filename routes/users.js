const express = require('express')
const router = express.Router()
const profileCtrl = require('../controllers/profiles')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})
router.get('/profile', profileCtrl.renderProfile)

module.exports = router
