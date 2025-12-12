import Container from "@/components/Shared/Container";
import React, { useRef } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import useAuth from "@/hooks/useAuth";
import PurchaseModal from "@/components/Modal/PurchaseModal";
import CodModal from "@/components/Modal/CodModal";
const OrderPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const quantityRef = useRef();
  const orderPriceRef = useRef();
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState(null);
  const [quantityError, setQuantityError] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axiosSecure
      .get(`/allProducts/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, axiosSecure]);

  const handleSubmit = (e) => {
    if (!e.target.checkValidity()) return;

    e.preventDefault();
    const quantity = parseInt(e.target.quantity.value, 10);
    const orderPrice = (quantity * product.price).toFixed(2);
    const orderData = {
      productId: product._id,
      productTitle: product.title,
      price: product.price,
      quantity,
      orderPrice,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: user?.email,
      contactNumber: e.target.contactNumber.value,
      deliveryAddress: e.target.deliveryAddress.value,
      notes: e.target.notes.value,
    };
    if (product.paymentOptions === "PayFirst") {
      setModalType("PayFirst");
      setIsOpen(true);
    } else if (product.paymentOptions === "Cash On Delivery") {
      setModalType("Cash On Delivery");
      setIsOpen(true);
    }
    console.log(orderData);
  };
  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
  };
  if (!product)
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  console.log(product);
  return (
    <div className="py-28">
      <Container>
        <div className="space-y-6 max-w-5xl mx-auto p-6  rounded-2xl shadow-2xl border border-gray-50/35">
          <h1 className="text-4xl text-[#3badcd] font-bold text-center">
            Order Page
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  placeholder="Email (auto-filled)"
                  className="input input-info w-full"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  defaultValue={product?.title}
                  placeholder="Product Title"
                  className="input input-info w-full"
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="">Price</label>
                <input
                  type="text"
                  defaultValue={`${product?.price} $`}
                  placeholder="Price "
                  className="input input-info w-full"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="">Order Price</label>
                <input
                  type="text"
                  placeholder="Order Price "
                  className="input input-info w-full"
                  ref={orderPriceRef}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input input-info w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input input-info w-full"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <div>
                  <label htmlFor="">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    placeholder="Enter Quantity"
                    className="input input-info w-full"
                    ref={quantityRef}
                    onChange={() => {
                      const qty = parseInt(quantityRef.current.value, 10);

                      if (isNaN(qty) || quantityRef.current.value === "") {
                        setQuantityError("");
                        orderPriceRef.current.value = "";
                        setDisableSubmit(true);
                        setTotalPrice(0);
                        return;
                      }
                      if (qty < product.minimumOrderQuantity) {
                        setQuantityError(
                          `Minimum quantity is ${product.minimumOrderQuantity}`
                        );
                        orderPriceRef.current.value = "";
                        setDisableSubmit(true);
                        setTotalPrice(0);
                        return;
                      }

                      if (qty > product.availableQuantity) {
                        setQuantityError(
                          `Only ${product.availableQuantity} available`
                        );
                        orderPriceRef.current.value = "";
                        setDisableSubmit(true);
                        setTotalPrice(0);
                        return;
                      }

                      setQuantityError("");
                      setDisableSubmit(false);
                      const price = qty * product.price;
                      orderPriceRef.current.value = `$${price.toFixed(2)}`;
                      setTotalPrice(price);
                    }}
                  />
                </div>

                {quantityError && (
                  <p className="text-red-500 text-sm mt-1">{quantityError}</p>
                )}
              </div>

              <div>
                <label htmlFor="">Contact Number</label>
                <input
                  type="number"
                  name="contactNumber"
                  placeholder="Contact Number"
                  required
                  className="input input-info w-full"
                />
              </div>
            </div>
            <label htmlFor="">Delivery Address</label>
            <textarea
              name="deliveryAddress"
              placeholder="Delivery Address"
              className="textarea textarea-info w-full"
              required
            ></textarea>
            <label htmlFor="">Additional Notes</label>
            <textarea
              name="notes"
              placeholder="Additional Notes "
              className="textarea textarea-info w-full"
            ></textarea>

            {product?.paymentOptions && (
              <button
                type="submit"
                disabled={disableSubmit}
                className={`block text-white font-semibold py-3 w-full rounded-full transition-transform mt-4
                  ${
                    disableSubmit
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#3badcd] hover:scale-105"
                  }`}
              >
                Submit Order
              </button>
            )}
          </form>
          <PurchaseModal
            product={product}
            totalPrice={totalPrice}
            closeModal={closeModal}
            isOpen={isOpen && modalType === "PayFirst"}
          />

          <CodModal
            product={product}
            totalPrice={totalPrice}
            closeModal={closeModal}
            isOpen={isOpen && modalType === "Cash On Delivery"}
          />
        </div>
      </Container>
    </div>
  );
};

export default OrderPage;
