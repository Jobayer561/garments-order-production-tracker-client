import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import TrackingOrderForm from "../Form/TrackingOrderForm";
import { X, Truck } from "lucide-react";

const TrackingModal = ({ isOpen, closeModal, order, refetch }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40">
        <div className="flex min-h-full items-center justify-center p-4 pt-20">
          <DialogPanel className="w-full max-w-2xl bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all">
            <div className="relative bg-linear-to-r from-[#3badcd] to-[#2f97b7] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-white">
                      Add Tracking Info
                    </DialogTitle>
                    <p className="text-cyan-100 text-sm mt-0.5">
                      Update delivery status
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <TrackingOrderForm
                closeModal={closeModal}
                order={order}
                refetch={refetch}
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default TrackingModal;
