const permissions = {
  superadmin: {
    "*": ["view", "create", "update", "delete"],
  },

  admin: {
    "*": ["view", "create", "update", "delete"],
  },

  networking: {
    rack: ["view"],
    physical: ["view"],
    host: ["view"],
    guest: ["view"],
    accessPoint: ["view", "create", "update", "delete"],
    accessPointMerk: ["view", "create", "update", "delete"],
    accessPointController: ["view", "create", "update", "delete"],
    switch: ["view", "create", "update", "delete"],
    router: ["view", "create", "update", "delete"],
    cctv: ["view", "create", "update", "delete"],
    cctvMerk: ["view", "create", "update", "delete"],
    cctvController: ["view", "create", "update", "delete"],
    ipList: ["view", "create", "update", "delete"],
    activityLog: ["view", "create", "update", "delete"],
    osVersion: ["view", "create", "update", "delete"],
    merk: ["view", "create", "update", "delete"],
    location: ["view", "create", "update", "delete"],
  },
  sysadmin: {
    rack: ["view", "create", "update", "delete"],
    physical: ["view", "create", "update", "delete"],
    host: ["view", "create", "update", "delete"],
    guest: ["view", "create", "update", "delete"],
    accessPoint: ["view"],
    accessPointMerk: ["view"],
    accessPointController: ["view"],
    switch: ["view"],
    router: ["view"],
    cctv: ["view"],
    cctvMerk: ["view"],
    cctvController: ["view"],
    ipList: ["view", "create", "update", "delete"],
    activityLog: ["view", "create", "update", "delete"],
    osVersion: ["view", "create", "update", "delete"],
    merk: ["view", "create", "update", "delete"],
    location: ["view", "create", "update", "delete"],
  },
  operator: {
    "*": ["view"],
  },
};

export default permissions;
