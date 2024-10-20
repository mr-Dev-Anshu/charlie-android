import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import LabelValue from "../../../components/UI/LabelValue";
import { formatDate } from "../../../utils/helpers";

const TourDetails = () => {
  const { id } = useLocalSearchParams();
  const { tour } = useSelector((state) => state.tour);

  const tourData = tour.find((item) => item._id === id);

  return (
    <View className="px-3">
      <LabelValue label={"Tour Name"} value={tourData?.name} />
      <LabelValue label={"Location"} value={tourData?.location} />
      <LabelValue label={"Description"} value={tourData?.description} />
      <LabelValue label={"Allowed Persons"} value={tourData?.total_seats} />
      <LabelValue
        label={"Tour Date"}
        value={`${formatDate(tourData?.tour_start)} - ${formatDate(
          tourData?.tour_end
        )}`}
      />
      <LabelValue
        label={"Booking Close Before"}
        value={formatDate(tourData?.tour_cost)}
      />
      <LabelValue
        label={"Tour Cost Per Seat (INR)"}
        value={formatDate(tourData?.booking_close)}
      />
      <LabelValue
        label={"Admin can reaject ?"}
        value={tourData?.can_admin_reject ? "Yes" : "No"}
      />
      <LabelValue
        label={"Payment gateway enabled ?"}
        value={tourData?.enable_payment_getway ? "Yes" : "No"}
      />
    </View>
  );
};

export default TourDetails;
