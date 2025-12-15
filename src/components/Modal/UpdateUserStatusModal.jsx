import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";

const UpdateUserStatusModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedStatus, setUpdatedStatus] = useState(user?.status);
  const [suspendReason, setSuspendReason] = useState(user?.reason || "");
  const [suspendFeedback, setSuspendFeedback] = useState(user?.feedback || "");
  const axiosSecure = useAxiosSecure();

  const handleStatusUpdate = async () => {
    try {
      await axiosSecure.patch("/update-status", {
        email: user?.email,
        status: updatedStatus,
        reason: updatedStatus === "suspend" ? suspendReason : undefined,
        feedback: updatedStatus === "suspend" ? suspendFeedback : undefined,
      });
      toast.success("Status Updated!!");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    } finally {
      closeModal();
    }
  };

  console.log(updatedStatus);
  return (
    <>
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
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black"
              >
                Update User Status
              </DialogTitle>
              <form>
                <div>
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    className="w-full my-3 select select-info"
                  >
                    <option value="pending" disabled>
                      Pending
                    </option>
                    <option value="approve">Approve</option>
                    <option value="suspend">Suspend</option>
                  </select>

                  {/* Show suspend reason & feedback only if suspended */}
                  {updatedStatus === "suspend" && (
                    <div className="flex flex-col gap-3 mt-2">
                      <select
                        value={suspendReason}
                        onChange={(e) => setSuspendReason(e.target.value)}
                        className="w-full select select-warning"
                      >
                        <option value="">Select Suspend Reason</option>
                        <option value="spam">Spam</option>
                        <option value="fraud">Fraud</option>
                        <option value="other">Other</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Enter feedback"
                        value={suspendFeedback}
                        onChange={(e) => setSuspendFeedback(e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                  )}
                </div>

                <div className="flex mt-2 justify-around">
                  <button
                    onClick={handleStatusUpdate}
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-full border border-transparent bg-[#3badcd] px-4 py-2 text-sm font-medium text-white hover:bg-[#3badcd]/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3badcd] focus-visible:ring-offset-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-full border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateUserStatusModal;
