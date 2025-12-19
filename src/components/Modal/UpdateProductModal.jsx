import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import UpdateProductForm from "../Form/UpdateProductForm";

const UpdateProductModal = ({
  setIsEditModalOpen,
  isOpen,
  product,
  closeModal,
  refetch,
}) => {
  return (
    <div className="">
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none  "
        onClose={() => setIsEditModalOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-20 opacity-100 bg-black/50">
            <DialogPanel
              transition
              className="w-full max-w-3xl mx-auto bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-red-100 px-3 py-1 rounded-md text-red-500 cursor-pointer"
                >
                  X
                </button>
              </div>
              <DialogTitle
                as="h3"
                className="text-3xl font-bold text-center leading-6 text-[#3badcd] mb-4"
              >
                Update Product Info
              </DialogTitle>
              <div className="mt-2 w-full">
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
    </div>
  );
};

export default UpdateProductModal;
