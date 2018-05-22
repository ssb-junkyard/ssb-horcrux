var secrets = require('secrets.js')

// you'd actually use your private key / seed
var key = 'someKey'

var hexKey = secrets.str2hex(key)
var shares = secrets.share(hexKey, 5, 3)

shares.forEach(s => {
  console.log('`' + s + '`')
  console.log('')
})

var combinedShares = secrets.combine(shares.slice(0, 3))
var myKey = secrets.hex2str(combinedShares)

console.log(myKey)
