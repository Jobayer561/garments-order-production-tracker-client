import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import TrackingOrderForm from "../Form/TrackingOrderForm";

const TrackingModal = ({ isOpen, closeModal, order, refetch }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-3xl mx-auto bg-white p-6 shadow-xl rounded-2xl
              duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-100 px-3 py-1 rounded-md text-red-500"
              >
                X
              </button>
            </div>

            <DialogTitle
              as="h3"
              className="text-3xl font-bold text-center text-[#3badcd] mb-3"
            >
              Add Tracking Info
            </DialogTitle>

            <TrackingOrderForm
              closeModal={closeModal}
              order={order}
              refetch={refetch}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default TrackingModal;
