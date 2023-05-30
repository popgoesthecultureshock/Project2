const dreamsCtrl = require('../controllers/dreams')
// const ensureLoggedIn = require('../config/ensureLoggedIn')

//GET /dreams
router.get('/', dreamsCtrl.index)

router.get('/new', dreamsCtrl.new)

module.exports = router
