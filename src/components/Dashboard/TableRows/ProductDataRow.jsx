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
    <tr>
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
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
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        <p className=" ">{title}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        <p className=" ">{category}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        <p className=" ">{price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        <p className=" ">{paymentOption}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        <span
          onClick={openModal}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold leading-tight mr-2"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-400 rounded-full"
          ></span>
          <span className="relative text-white">Delete</span>
        </span>

        <DeleteModal
          productId={_id}
          isOpen={isOpen}
          closeModal={closeModal}
          refetch={refetch}
        />

        <span
          onClick={() => setIsEditModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[#3badcd] rounded-full"
          ></span>
          <span className="relative text-white">Update</span>
        </span>

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
