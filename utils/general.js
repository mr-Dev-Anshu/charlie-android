export const formatDate = (dateValue) => {
  const date = new Date(dateValue);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffInMilliseconds = Math.abs(end - start);
  const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInNights = diffInDays - 1;

  return `${diffInDays} days ${diffInNights} nights`;
};