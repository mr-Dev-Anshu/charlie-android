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

export const apiRequest = async (
  url,
  method = "GET",
  body = null,
  headers = {}
) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) throw new Error(`Error: ${data.message || res.statusText}`);

    return data;
  } catch (error) {
    console.error(`API request failed at ${url}:`, error);
    throw error;
  }
};
