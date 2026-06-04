import { c as createSsrRpc } from "./createSsrRpc-_V2Ptgae.mjs";
import { b as createServerFn } from "./server-B2xBzUrm.mjs";
const getClassesFn = createServerFn().handler(createSsrRpc("435ce2062fe92c765d66f882e26ad481339857b57117cb54a6aba4e0f9662cba"));
const getRombelsFn = createServerFn().validator((data) => data).handler(createSsrRpc("3336b8080f8b2a02d6549b7bd359b0c60feb032ed5078f69068814331599336c"));
const createRombelFn = createServerFn().validator((data) => data).handler(createSsrRpc("231742f70c36c72f4e68314d58b1ab123c34da290259ba948318fc96359efcb4"));
createServerFn().validator((data) => data).handler(createSsrRpc("712e2034d3e2a505dca10c4474263f8496d4dda6e757e4b950474755f2d9a38a"));
const deleteRombelFn = createServerFn().validator((data) => data).handler(createSsrRpc("4bf6a541f0c481826768b5d6ff4dd2e98f9266b87935027c5f77eafab8ea7036"));
export {
  getRombelsFn as a,
  createRombelFn as c,
  deleteRombelFn as d,
  getClassesFn as g
};
