import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Trash2, X, Loader } from "lucide-react";
import { useState } from "react";

const DeleteModal = ({ isOpen, closeModal, productId, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axiosSecure.delete(`/products/${productId}`);
      closeModal();
      refetch();
      toast.success("Product deleted successfully ✓");
    } catch {
      toast.error("Failed to delete product");
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
                <Trash2 className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <DialogTitle className="text-center text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Delete Product?
            </DialogTitle>

            <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-6">
              This action is permanent and cannot be undone. Your product will
              be permanently deleted.
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl mb-6">
              <p className="text-xs text-red-600 dark:text-red-400 font-semibold">
                ⚠️ Warning
              </p>
              <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                All data associated with this product will be lost.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-5 w-5" />
                    Yes, Delete
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

export default DeleteModal;
