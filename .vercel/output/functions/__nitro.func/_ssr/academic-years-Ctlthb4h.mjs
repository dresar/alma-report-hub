import { c as createSsrRpc } from "./createSsrRpc-_V2Ptgae.mjs";
import { b as createServerFn } from "./server-B2xBzUrm.mjs";
const getAcademicYearsFn = createServerFn().handler(createSsrRpc("9611de7b963f3895b1109843b15c9b1fc7ad5ab82990d5af529378907ff0ac82"));
const createAcademicYearFn = createServerFn().validator((data) => data).handler(createSsrRpc("9c2a64d59a1f02b6f05e92cc6e77564b5a774827dedcde79adcef70d1e16a5e6"));
const setActiveAcademicYearFn = createServerFn().validator((data) => data).handler(createSsrRpc("2bdd38139eeca6e30b2a66faa03f46fb49a91c1d064e61a1382ffe970ee69fe4"));
const deleteAcademicYearFn = createServerFn().validator((data) => data).handler(createSsrRpc("5cb2ac8aaf83688410fa5793e8365e63f21fb04021042643addabf4f33797733"));
export {
  createAcademicYearFn as c,
  deleteAcademicYearFn as d,
  getAcademicYearsFn as g,
  setActiveAcademicYearFn as s
};
