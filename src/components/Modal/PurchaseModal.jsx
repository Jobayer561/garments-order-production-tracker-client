import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import {
  CreditCard,
  ShoppingCart,
  User,
  Package,
  X,
  Loader,
} from "lucide-react";
import { useState } from "react";

const PurchaseModal = ({
  closeModal,
  isOpen,
  product,
  totalPrice,
  quantity,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { _id, title, category, description, images = [] } = product || {};

  const handlePayment = async () => {
    try {
      setLoading(true);
      const paymentInfo = {
        productId: _id,
        title,
        category,
        description,
        images,
        quantity: quantity,
        price: totalPrice,
        Buyer: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      );
      window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none mt-12"
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
                <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <DialogTitle className="text-center text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Confirm Purchase
            </DialogTitle>
            <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-6">
              Secure Payment with Stripe
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
                    Buyer
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {user?.displayName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide font-semibold">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">
                    ${totalPrice.toFixed(2)}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Qty: {quantity}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Powered by
              </p>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Stripe
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePayment}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    Pay with Stripe
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

export default PurchaseModal;
