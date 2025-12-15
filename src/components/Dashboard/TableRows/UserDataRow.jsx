import UpdateUserStatusModal from "@/components/Modal/UpdateUserStatusModal";
import { useState } from "react";

const UserDataRow = ({ refetch, user }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
        <p className="font-semibold">{user?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
        <p className="text-gray-500 font-semibold">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
        <p className="text-gray-500 font-semibold">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
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

      <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-2 font-normal md:font-semibold text-white leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[#3badcd] opacity-80 rounded-full"
          ></span>
          <span className="relative">UpdateStatus</span>
        </span>
        {/* Modal */}
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
