const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default formatDate;
