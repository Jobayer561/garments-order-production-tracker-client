import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";

const ViewTrackingTimeline = ({ orderId }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: trackOrder = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tracking-timeline", orderId],
    enabled: !!orderId,
    initialData: [],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      console.log("Fetching tracking for orderId:", id);
      const res = await axiosSecure.get(`/track-order/${id}`);
      console.log("Tracking response:", res.data);
      return res.data.trackOrder || [];
    },
  });

  if (!orderId) {
    return <p className="text-sm text-slate-500">No tracking ID provided.</p>;
  }

  if (isLoading) {
    return <LoadingSpinner/>
  }

  if (isError) {
    return (
      <div className="text-sm text-red-600">
        Failed to load timeline{error?.message ? `: ${error.message}` : ""}
        <button
          onClick={() => refetch()}
          className="ml-2 text-[#3badcd] underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (trackOrder.length === 0) {
    return <p className="text-sm text-slate-500">No tracking updates yet.</p>;
  }

  return (
    <div className="space-y-4">
      {trackOrder.map((track, idx) => {
        const isLatest = idx === trackOrder.length - 1;
        return (
          <div
            key={`${track.status}-${idx}`}
            className={`border rounded-lg p-4 shadow-sm transition-colors ${
              isLatest
                ? "bg-[#3badcd]/10 border-[#3badcd]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    isLatest ? "#3badcd]" : "bg-slate-300"
                  }`}
                />
                <h3 className="text-base font-semibold text-slate-900">
                  {track.status}
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                {track.dateTime
                  ? new Date(track.dateTime).toLocaleString()
                  : ""}
              </span>
            </div>

            <div className="mt-2 text-sm text-slate-700 space-y-1">
              {track.location && (
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {track.location}
                </p>
              )}
              {track.note && (
                <p>
                  <span className="font-medium">Note:</span> {track.note}
                </p>
              )}
            </div>

            {isLatest && (
              <span className="inline-block mt-3 text-xs font-semibold text-[#3badcd]">
                Latest update
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ViewTrackingTimeline;
