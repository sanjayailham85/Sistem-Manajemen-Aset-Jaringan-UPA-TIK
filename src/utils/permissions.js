const permissions = {
  superadmin: {
    "*": ["view", "create", "update", "delete"],
  },

  admin: {
    rack: ["view", "create", "update", "delete"],
    physical: ["view", "create", "update", "delete"],
    host: ["view", "create", "update", "delete"],
    guest: ["view", "create", "update", "delete"],
    accessPoint: ["view", "create", "update", "delete"],
    switch: ["view", "create", "update", "delete"],
    router: ["view", "create", "update", "delete"],
    cctv: ["view", "create", "update", "delete"],
    user: ["view"],
  },

  operator: {
    rack: ["view", "create", "update"],
    physical: ["view", "create", "update"],
    host: ["view", "create", "update"],
    guest: ["view", "create", "update"],
    accessPoint: ["view", "create", "update"],
    switch: ["view", "create", "update"],
    router: ["view", "create", "update"],
    cctv: ["view", "create", "update"],
  },

  guest: {
    rack: ["view"],
    physical: ["view"],
    host: ["view"],
    guest: ["view"],
    accessPoint: ["view"],
    switch: ["view"],
    router: ["view"],
    cctv: ["view"],
  },
};

export default permissions;
