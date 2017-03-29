# ssb-horcrux

This is a proof of concept that will make a useful depject module at some point.

The idea is to split your private key into `n` parts, then distribute those to (mostly) trusthworthy friends.
If you ever need to recover your key, you can ask those friends for those fragments, requiring only `m` of them to fully recover your key.
(where `m <= n` and is decided at the time of split)

## example script

Splitting a key into 5 parts, but only needing 3 to recover your key.

```js
var secrets = require('secrets.js')

// you'd actually use your private key
var key = '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519' 

var hexKey =  secrets.str2hex(key)
var shares = secrets.share( hexKey, 5, 3 )

console.log( shares )

var combinedShares = secrets.combine( shares.slice(0,3) )
var myKey          = secrets.hex2str( cominedShares )

console.log( myKey )
```
