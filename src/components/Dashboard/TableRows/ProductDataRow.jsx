import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import UpdateManagerProductModal from "@/components/Modal/UpdateManagerProductModal";

const ProductDataRow = ({ product, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const closeEditModal = () => setIsEditModalOpen(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const { _id, title, category, paymentOption, price, images = [] } = product;

  const imgUrl =
    images.length > 0
      ? images[0]
      : "https://via.placeholder.com/400x300?text=No+Image";
  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={imgUrl}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <p className=" font-semibold">{title}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <p className=" font-semibold">{category}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <p className=" font-semibold">{price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <p className=" font-semibold">{paymentOption}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <button
          onClick={openModal}
          className="inline-flex px-3 py-1.5 rounded-full bg-red-500 text-white font-semibold text-xs hover:bg-red-600 transition-colors mr-2"
        >
          Delete
        </button>

        <DeleteModal
          productId={_id}
          isOpen={isOpen}
          closeModal={closeModal}
          refetch={refetch}
        />

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="inline-flex px-3 py-1.5 rounded-full bg-[#3badcd] text-white font-semibold text-xs hover:bg-[#3badcd]/80 transition-colors"
        >
          Update
        </button>

        <UpdateManagerProductModal
          refetch={refetch}
          closeModal={closeEditModal}
          product={product}
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </td>
    </tr>
  );
};

export default ProductDataRow;
