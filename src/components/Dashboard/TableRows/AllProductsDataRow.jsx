import { useEffect, useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import UpdateProductModal from "@/components/Modal/UpdateProductModal";

const AllProductsDataRow = ({ product, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const closeEditModal = () => setIsEditModalOpen(false);

  const {
    _id,
    title,
    category,
    created_By,
    showOnHomePage,
    price,
    images = [],
  } = product;

  const [showHome, setShowHome] = useState(showOnHomePage);

  useEffect(() => {
    setShowHome(showOnHomePage);
  }, [showOnHomePage]);

  const imgUrl =
    images.length > 0
      ? images[0]
      : "https://via.placeholder.com/400x300?text=No+Image";

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleToggle = async () => {
    const updatedValue = !showHome;
    setShowHome(updatedValue);

    try {
      await axiosSecure.patch(`/products/${_id}/home`, {
        showOnHomePage: updatedValue,
      });
      toast.success("Homepage visibility updated");
      refetch();
    } catch (error) {
      setShowHome(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <img
          src={imgUrl}
          alt={title}
          className="object-cover rounded h-10 w-10"
        />
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {title}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        ${price}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {category}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {created_By}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <input
          type="checkbox"
          checked={showHome}
          onChange={handleToggle}
          className="toggle toggle-sm"
        />
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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

        <UpdateProductModal
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

export default AllProductsDataRow;
