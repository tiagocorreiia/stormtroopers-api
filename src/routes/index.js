var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.status(201)
  res.json({ name: 'William Bruno', email: 'wbruno@gmail.com' })
})

// stormtroopers
router.use('/stormtroopers', require('./stormtroopers'))

module.exports = router
