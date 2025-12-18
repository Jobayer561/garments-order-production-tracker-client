import ViewTrackingTimeline from "@/components/Tracking/ViewTrackingTImeline";
import React from "react";
import { useParams, Link } from "react-router";

const TrackOrder = () => {
  const { orderId } = useParams();
  console.log(orderId);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#3badcd]">
            Tracking Timeline
          </h1>
        </div>
        <Link to={-1} className="text-sm text-[#3badcd] hover:underline">
          Back
        </Link>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <ViewTrackingTimeline orderId={orderId} />
      </div>
    </div>
  );
};

export default TrackOrder;
