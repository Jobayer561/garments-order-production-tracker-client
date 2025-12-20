import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const DeleteModal = ({ isOpen, closeModal, productId, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/products/${productId}`);
      closeModal();
      refetch();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto opacity-100 bg-black/50 transition-transform">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 shadow-xl rounded-2xl">
            <DialogTitle className="text-lg font-medium text-gray-900">
              Are you sure?
            </DialogTitle>

            <p className="mt-2 text-sm text-gray-500">
              You cannot undo once it&apos;s done!
            </p>

            <hr className="mt-6 text-gray-400 border border-dotted" />

            <div className="flex mt-4 justify-around">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>

              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
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

export default DeleteModal;
