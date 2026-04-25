export const buildRoute = (type, id) => {
  switch (type) {
    case "physical":
      return `/racks/:rackId/physical/${id}`;

    case "host":
      return `/racks/:rackId/physical/:physicalId/host/${id}`;

    case "guest":
      return `/racks/:rackId/physical/:physicalId/host/:hostId/guest/${id}`;

    case "switch":
      return `/digital/switch/${id}`;

    case "router":
      return `/digital/router/${id}`;

    case "cctv":
      return `/digital/cctv/${id}`;

    case "accessPoint":
      return `/digital/accessPoint/${id}`;

    default:
      return "/";
  }
};
