import TrackingModal from "@/components/Modal/TrackingModal";
import React, { useState } from "react";
import { Link } from "react-router";

const ApproveOrdersDataRow = ({ order, refetch }) => {
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  return (
    <tr>
      <td className="px-6 py-4 text-sm border-b border-gray-300 font-semibold truncate max-w-[150px]">
        {order?._id}
      </td>

      <td className="px-6 py-4 text-sm border-b border-gray-300 font-semibold">
        {order?.buyer?.name}
      </td>

      <td className="px-6 py-4 text-sm border-b border-gray-300 font-semibold">
        {order?.buyer?.email}
      </td>

      <td className="px-6 py-4 text-sm border-b border-gray-300 font-semibold">
        {order?.product?.name}
      </td>

      <td className="px-5 py-4 border-b border-slate-200  text-sm text-center">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100  text-blue-700 font-semibold">
          {order?.quantity}
        </span>
      </td>

      <td className="px-6 py-4 text-sm border-b border-gray-300 whitespace-nowrap">
        {order?.approvedAt}
      </td>
      <td className="px-6 py-4 text-sm border-b border-gray-300 whitespace-nowrap">
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/dashboard/track-info/${order?._id}`}
            className="inline-flex rounded-full bg-[#3badcd] px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
          >
            View Tracking
          </Link>

          <button
            onClick={() => setIsTrackingOpen(true)}
            className="inline-flex rounded-full bg-green-500 px-4 py-2 text-xs font-semibold text-white"
          >
            Add Tracking
          </button>

          <TrackingModal
            isOpen={isTrackingOpen}
            closeModal={() => setIsTrackingOpen(false)}
            order={order}
            refetch={refetch}
          />
        </div>
      </td>
    </tr>
  );
};

export default ApproveOrdersDataRow;
