![](horcrux.png)

# ssb-horcrux

[WIP] - will be a depject patchbay module

Do you crave immortality? Secure your private key by splitting it like Voldemort did (no human sacrifce required).

Split your key into some number of parts, give those to trusted friends, and if your computer ever dies, you can re-create your private key.


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

https://www.npmjs.com/package/secrets.js

