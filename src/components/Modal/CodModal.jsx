import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  DollarSign,
  ShoppingCart,
  User,
  Package,
  X,
  Loader,
} from "lucide-react";

const CodModal = ({ closeModal, isOpen, product, totalPrice }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { _id, title, category } = product || {};

  const handlePayment = async () => {
    try {
      setLoading(true);
      const orderData = {
        productId: _id,
        quantity: 1,
        buyer: {
          name: user?.displayName,
          email: user?.email,
        },
      };

      const { data } = await axiosSecure.post("/create-cod-order", orderData);

      if (data.success) {
        toast.success("Order placed successfully! 🎉");
        closeModal();
        navigate(`/dashboard/orders/${data.orderId}`);
      }
    } catch {
      toast.error("Failed to place order");
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
          <DialogPanel className="w-full max-w-md bg-white dark:bg-slate-900 p-8 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 transform transition-all">
            <div className="flex justify-end mb-4">
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                <ShoppingCart className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <DialogTitle className="text-center text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Review Your Order
            </DialogTitle>
            <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-6">
              Cash on Delivery
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <Package className="h-5 w-5 text-[#3badcd] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Product
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white truncate">
                    {title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {category}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <User className="h-5 w-5 text-[#3badcd] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Customer
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {user?.displayName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-linear-to-r from-green-50 to-cyan-50 dark:from-green-900/20 dark:to-cyan-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide font-semibold">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePayment}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Confirm Order
                  </>
                )}
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

export default CodModal;
