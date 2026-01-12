import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import UpdateProductForm from "../Form/UpdateProductForm";
import { X, RefreshCw } from "lucide-react";

const UpdateProductModal = ({
  setIsEditModalOpen,
  isOpen,
  product,
  closeModal,
  refetch,
}) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsEditModalOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40">
        <div className="flex min-h-full items-center justify-center p-4 pt-20">
          <DialogPanel className="w-full max-w-3xl bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all">
            {/* Header */}
            <div className="relative bg-linear-to-r from-[#3badcd] to-[#2f97b7] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <RefreshCw className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-white">
                      Update Product
                    </DialogTitle>
                    <p className="text-cyan-100 text-sm mt-0.5">
                      Modify product details
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <UpdateProductForm
                closeModal={closeModal}
                product={product}
                refetch={refetch}
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateProductModal;
