# msgpack-es

Msgpack implemented in pure ECMAScript.

## Usage

These files are written using ES6 modules.  I consume them using [rollup][].

For example:

```js
import { encode, decode } from "./msgpack";

// Encode a value to Uint8Array holding msgpack
let encoded = encode([1,2,3]);

// Decode back to a value
let decoded = decode(encoded);

```

### Custom Types

Msgpack supports up to 128 custom, application defined, types.  To register a new
type you need to provide a constructor function and encode/decode functions.

For example, here is how you would serialize `RegExp` instances.

```js
import { register, encode, decode } from "./msgpack";

register(1, RegExp, encodeRegExp, decodeRegExp);
function encodeRegExp(reg) {
  // this needs to return a Uint8Array that will be stored.  The format can be
  // anything, but here we're reusing msgpack for convienience.
  return encode([reg.source,reg.flags]);
}
function decodeRegExp(buf) {
  let opts = decode(buf);
  return new RegExp(opts[0], opts[1]);
}
```

## Tests

Run tests with [rollup][] and [node][].

```sh
rollup test.js | node
```

rollup: http://rollupjs.org
node: https://nodejs.org/
