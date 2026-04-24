import can from "./rbac";

const usePermission = (module) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return {
    canView: can(role, module, "view"),
    canCreate: can(role, module, "create"),
    canUpdate: can(role, module, "update"),
    canDelete: can(role, module, "delete"),
  };
};

export default usePermission;
