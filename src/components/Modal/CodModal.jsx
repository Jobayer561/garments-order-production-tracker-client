import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

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
        toast.success("Order placed successfully!");
        closeModal();
        navigate(`/dashboard/orders/${data.orderId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500"> {title}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Category: {category}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Customer: {user?.displayName}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500">Price: $ {totalPrice}</p>
            </div>

            <div className="flex mt-2 justify-around">
              <button
                onClick={handlePayment}
                disabled={loading}
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Placing Order..." : "Cash On Delivery"}
              </button>
              <button
                type="button"
                disabled={loading}
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={closeModal}
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
