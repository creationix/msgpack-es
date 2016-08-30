
import { register, encode, decode, uint16 } from "./msgpack";

// Test custom Serialization, by encoding regular expressions.
register(1, RegExp,
  (reg) => { return encode([reg.source,reg.flags]); },
  (buf) => { let opts = decode(buf); return new RegExp(opts[0], opts[1]); }
);

function bigObj(size) {
  let obj = {};
  for (let i = 0; i < size; i++) {
    obj[i] = i;
  }
  return obj;
}

function bigArray(size) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr[i] = i;
  }
  return arr;
}

let tests = [
  /a test/i,
  /another/g,
  true,
  false,
  null,
  "Hello",
  [1, 2, 3],
  new Uint8Array([1,2,3]),
  {name:"Tim"},
  {
    isProgrammer: true,
    badParts: null,
    name: "Tim",
    age: 34,
    message: /Hello World/
  },
  [1,-1,100,-100,10000,-10000, 100000000, -100000000, 10000000000, -1000000000],
  bigObj(10),
  bigObj(100),
  bigObj(1000),
  bigObj(10000),
  bigArray(10),
  bigArray(100),
  bigArray(1000),
  bigArray(10000),
  bigArray(100000),
  bigArray(1000000),
];

function essence(value) {
  return Object.prototype.toString.call(value)+value;
}


for (let test of tests) {
  console.log("Expected", test);
  let encoded = encode(test);
  console.log("Encoded", encoded);
  let decoded = decode(encoded);
  console.log("Actual", decoded);
  if (essence(test) !== essence(decoded)) {
    throw new Error("MISMATCH");
  }
}
