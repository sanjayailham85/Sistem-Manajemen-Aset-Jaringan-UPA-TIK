import permissions from "./permissions";

const can = (role, module, action) => {
  if (!role || !module || !action) return false;

  const rolePermissions = permissions[role];
  if (!rolePermissions) return false;

  if (rolePermissions["*"]?.includes(action)) {
    return true;
  }

  return rolePermissions[module]?.includes(action) || false;
};

export default can;
