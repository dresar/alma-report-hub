import { c as createSsrRpc } from "./createSsrRpc-_V2Ptgae.mjs";
import { b as createServerFn } from "./server-B2xBzUrm.mjs";
const loginFn = createServerFn().validator((data) => data).handler(createSsrRpc("e18bff70a16fc4542841e46b562fa67cd8c1ef8455738ee913280cc629bff424"));
createServerFn().validator((data) => data).handler(createSsrRpc("e8e06ff860d1930ea22710367f0df4d6bce3aac088893acaa56d9cfbc2fcfc71"));
const changePasswordFn = createServerFn().validator((data) => data).handler(createSsrRpc("887f56ebd23b4905a5d67ace11f3c4eefdef22825f66f227414be017ea69b6f6"));
const updateProfileFn = createServerFn().validator((data) => data).handler(createSsrRpc("71c1880e4d827eff34bff83a011bd4ffebfd507bee103c4dc806921ec19ee28d"));
const getUsersFn = createServerFn().validator((data) => data).handler(createSsrRpc("8bd0613363d21bbf16a879929eb9c00600a291aa82c4ca42ba2a8f36ef72e222"));
const createUserFn = createServerFn().validator((data) => data).handler(createSsrRpc("fc3163788c15aff1c2e290d35756bc459551f8171d77d9ae86d9da7cef7519a1"));
const toggleUserFn = createServerFn().validator((data) => data).handler(createSsrRpc("6a38eae3e4319b22e1704426c89876d6663b69f71ec627ab4a0a18fd5f7e96e8"));
const deleteUserFn = createServerFn().validator((data) => data).handler(createSsrRpc("50e99733fc00951ed94cfc360ff63fc6de9cc83ce40e103200b14a373d6d4b56"));
export {
  createUserFn as a,
  changePasswordFn as c,
  deleteUserFn as d,
  getUsersFn as g,
  loginFn as l,
  toggleUserFn as t,
  updateProfileFn as u
};
