import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AlertTriangle, X, Check, Loader } from "lucide-react";
import { useState } from "react";

const CancelOrder = ({ isOpen, closeModal, order, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.delete(`/my-orders/${order._id}`);
      if (response.status === 200) {
        closeModal();
        refetch();
        toast.success("Order cancelled successfully ✓");
      }
    } catch {
      toast.error("Failed to cancel order");
    } finally {
      setLoading(false);
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
          <DialogPanel className="w-full max-w-sm bg-white dark:bg-slate-900 p-8 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 transform transition-all">
            <div className="flex justify-end mb-4">
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="flex justify-center mb-4">
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <DialogTitle className="text-center text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Cancel Order?
            </DialogTitle>

            <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-6">
              This action cannot be undone. Your order will be permanently
              cancelled.
            </p>

            {order && (
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl mb-6 space-y-2 border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Order Details
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Order ID:</span>{" "}
                  {order?._id?.slice(0, 8)}...
                </p>
                {order?.productTitle && (
                  <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
                    <span className="font-semibold">Product:</span>{" "}
                    {order.productTitle}
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Canceling...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5" />
                    Yes, Cancel Order
                  </>
                )}
              </button>
              <button
                onClick={closeModal}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Keep Order
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CancelOrder;
