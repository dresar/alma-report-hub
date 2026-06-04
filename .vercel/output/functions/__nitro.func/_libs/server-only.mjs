var serverOnly = {};
var hasRequiredServerOnly;
function requireServerOnly() {
  if (hasRequiredServerOnly) return serverOnly;
  hasRequiredServerOnly = 1;
  throw new Error(
    "This module cannot be imported from a Client Component module. It should only be used from a Server Component."
  );
}
requireServerOnly();
