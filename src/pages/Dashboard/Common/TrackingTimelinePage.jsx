import React from "react";
import { useParams, Link } from "react-router";
import ViewTrackingTimeline from "@/components/Tracking/ViewTrackingTimeline";

const TrackingTimelinePage = () => {
  const { orderId } = useParams();
  console.log("TrackingTimelinePage orderId from params:", orderId);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tracking Timeline</h1>
          <p className="text-sm text-slate-500">Order ID: {orderId || "Missing"}</p>
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

export default TrackingTimelinePage;
