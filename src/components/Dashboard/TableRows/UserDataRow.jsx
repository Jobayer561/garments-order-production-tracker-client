import UpdateUserStatusModal from "@/components/Modal/UpdateUserStatusModal";
import { useState } from "react";

const UserDataRow = ({ refetch, user }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <p className="font-semibold">{user?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <p className="font-semibold ">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <p className="font-semibold ">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            user?.status === "approve"
              ? "bg-green-100 text-green-600"
              : user?.status === "suspend"
              ? "bg-red-100 text-red-600"
              : user?.status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {user?.status}
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex px-4 py-2 rounded-full bg-[#3badcd] text-white font-semibold hover:bg-[#3badcd]/80 transition-colors"
        >
          UpdateStatus
        </button>
        <UpdateUserStatusModal
          isOpen={isOpen}
          user={user}
          refetch={refetch}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
