import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { X, CheckCircle, AlertCircle, User } from "lucide-react";

const UpdateUserStatusModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedStatus, setUpdatedStatus] = useState(user?.status);
  const [suspendReason, setSuspendReason] = useState(user?.reason || "");
  const [suspendFeedback, setSuspendFeedback] = useState(user?.feedback || "");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleStatusUpdate = async () => {
    try {
      setLoading(true);
      await axiosSecure.patch("/update-status", {
        email: user?.email,
        status: updatedStatus,
        reason: updatedStatus === "suspend" ? suspendReason : undefined,
        feedback: updatedStatus === "suspend" ? suspendFeedback : undefined,
      });
      refetch();
      toast.success("Status Updated! ✓");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approve":
        return "text-green-600 dark:text-green-400";
      case "suspend":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-yellow-600 dark:text-yellow-400";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "approve":
        return "bg-green-100 dark:bg-green-900/30";
      case "suspend":
        return "bg-red-100 dark:bg-red-900/30";
      default:
        return "bg-yellow-100 dark:bg-yellow-900/30";
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40">
        <div className="flex min-h-full items-center justify-center p-4 pt-20">
          <DialogPanel className="w-full max-w-md bg-white dark:bg-slate-900 p-8 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 transform transition-all">
            <div className="flex justify-end mb-4">
              <button
                onClick={closeModal}
                disabled={loading}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <DialogTitle className="text-center text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Update User Status
            </DialogTitle>
            <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-6">
              {user?.displayName || user?.email}
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl mb-6 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                Email
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {user?.email}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  User Status
                </label>
                <select
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="approve">Approve</option>
                  <option value="suspend">Suspend</option>
                </select>
              </div>

              {updatedStatus === "suspend" && (
                <div className="space-y-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                      Suspend Reason
                    </label>
                    <select
                      value={suspendReason}
                      onChange={(e) => setSuspendReason(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-red-200 dark:border-red-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
                    >
                      <option value="">Select Reason</option>
                      <option value="spam">Spam</option>
                      <option value="fraud">Fraud</option>
                      <option value="violation">Terms Violation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                      Feedback
                    </label>
                    <textarea
                      placeholder="Enter suspension feedback..."
                      value={suspendFeedback}
                      onChange={(e) => setSuspendFeedback(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-red-200 dark:border-red-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none resize-none"
                      rows="3"
                    />
                  </div>
                </div>
              )}
            </div>

            {updatedStatus && (
              <div
                className={`mt-6 p-4 rounded-xl border-2 ${getStatusBgColor(
                  updatedStatus
                )}`}
              >
                <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">
                  New Status
                </p>
                <div className="flex items-center gap-2">
                  {updatedStatus === "approve" && (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                  {updatedStatus === "suspend" && (
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                  <p
                    className={`font-bold text-lg capitalize ${getStatusColor(
                      updatedStatus
                    )}`}
                  >
                    {updatedStatus}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleStatusUpdate}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-linear-to-r from-[#3badcd] to-[#2f97b7] hover:from-[#3badcd]/90 hover:to-[#2f97b7]/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all hover:shadow-lg"
              >
                {loading ? "Updating..." : "Update Status"}
              </button>
              <button
                onClick={closeModal}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateUserStatusModal;
