import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const TrackingOrderForm = ({ order, refetchTimeline }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!order?._id) return;

    setLoading(true);
    try {
      await axiosSecure.patch(`/track-order/${order._id}`, {
        status: data.status,
        note: data.note || undefined,
        location: data.location || undefined,
      });

      reset();
      setIsOpen(false);
      if (refetchTimeline) refetchTimeline();
      toast.success("Tracking update added successfully!");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to add tracking update"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-[#3badcd] px-6 py-3 text-white font-semibold"
        >
          + Add Tracking
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 md:mt-0 mt-12 px-4">
          <div className="bg-white w-full max-w-md rounded-lg p-6 relative border border-gray-300 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center text-[#3badcd]">
              Add Tracking Update
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Location (optional)"
                className="w-full px-4 py-2 rounded-md border input input-info"
                {...register("location")}
              />

              <select
                className="w-full px-4 py-2 rounded-md border select select-info"
                {...register("status", { required: "Status is required" })}
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="Cutting Completed">Cutting Completed</option>
                <option value="Sewing Started">Sewing Started</option>
                <option value="Finishing">Finishing</option>
                <option value="QC Checked">QC Checked</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
              </select>
              {errors.status && (
                <p className="text-red-500">{errors.status.message}</p>
              )}

              <textarea
                rows="3"
                placeholder="Note (optional)"
                className="w-full px-4 py-2 rounded-md border textarea textarea-info"
                {...register("note")}
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md border text-gray-500 border-gray-300"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3badcd] text-white px-6 py-2 rounded-md hover:bg-[#3badcd]/80"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingOrderForm;
