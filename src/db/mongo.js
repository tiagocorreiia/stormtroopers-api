var mongojs = require('mongojs')
var config = require('config')
var debug = require('debug')('livro_nodejs:db')

function _connection() {
  var username = config.get('mongo.username'),
    password = config.get('mongo.password'),
    server = config.get('mongo.server'),
    port = config.get('mongo.port'),
    database = config.get('mongo.database'),
    auth = username ? username + ':' + password + '@' : ''
  return 'mongodb://' + auth + server + ':' + port + '/' + database
}

var db = mongojs(_connection())

db.on('error', function (err) {
  debug(err)
})

module.exports = db
