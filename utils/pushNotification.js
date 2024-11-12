export const sendNotificaton = async (title, body, data) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/notifications/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          data,
        }),
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to send notification");
    }
    console.log("Notification sent successfully.");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
