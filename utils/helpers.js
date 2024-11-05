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

export const transformAllocationData = (data) => {
  const roomMap = {};

  data.forEach((entry) => {
    const roomNo = entry.roomNumber;

    // Initialize room data if it doesn't exist
    if (!roomMap[roomNo]) {
      roomMap[roomNo] = {
        roomNo,
        occupancy: entry.occupancy,
        guestNames: [],
        roomType: entry.roomType,
        accommodationIds: [],
        allocationIds: [],
        bookingIds: [],
        tourId: entry.tourId,
      };
    }

    // Add guest name to the room's guestNames array
    roomMap[roomNo].guestNames.push(entry.bookingData.name);
    roomMap[roomNo].allocationIds.push(entry._id);
    roomMap[roomNo].bookingIds.push(entry.bookingId);
    roomMap[roomNo].accommodationIds.push(entry.accommodationId);
  });

  // Convert the map values to an array
  return Object.values(roomMap);
};
