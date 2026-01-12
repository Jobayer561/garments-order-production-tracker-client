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
import {
  ShoppingCart,
  Package,
  DollarSign,
  User,
  Phone,
  MapPin,
  FileText,
  CreditCard,
} from "lucide-react";
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
  const [orderQuantity, setOrderQuantity] = useState(0);

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
    if (product.paymentOption === "Stripe") {
      setModalType("Stripe");
      setIsOpen(true);
    } else if (product.paymentOption === "Cash On Delivery") {
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
    <div className="min-h-screen py-28 bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-[#3badcd] to-[#2f97b7] rounded-2xl mb-4 shadow-lg shadow-cyan-500/30">
              <ShoppingCart className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#3badcd] to-[#2f97b7] bg-clip-text text-transparent mb-2">
              Place Your Order
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Complete the form below to place your order
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Product Info Banner */}
            <div className="bg-gradient-to-r from-[#3badcd] to-[#2f97b7] p-6 text-white">
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6" />
                <div>
                  <p className="text-sm opacity-90">Product</p>
                  <h2 className="text-xl font-bold">{product?.title}</h2>
                </div>
              </div>
            </div>

            <form className="p-6 md:p-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-[#3badcd]" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Customer Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Product Title
                    </label>
                    <input
                      type="text"
                      defaultValue={product?.title}
                      placeholder="Product Title"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-[#3badcd]" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Order Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Unit Price
                    </label>
                    <input
                      type="text"
                      defaultValue={`$${product?.price}`}
                      placeholder="Price"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Total Price
                    </label>
                    <input
                      type="text"
                      placeholder="Total will be calculated"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none font-bold"
                      ref={orderPriceRef}
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      required
                      placeholder="Enter quantity"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
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
                        setOrderQuantity(qty);
                      }}
                    />
                    {quantityError && (
                      <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                        <FileText className="h-4 w-4" />
                        <span>{quantityError}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Number
                    </label>
                    <input
                      type="number"
                      name="contactNumber"
                      placeholder="Enter phone number"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-[#3badcd]" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Delivery Information
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Delivery Address
                    </label>
                    <textarea
                      name="deliveryAddress"
                      placeholder="Enter complete delivery address"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none resize-none"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      placeholder="Any special instructions or notes"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none resize-none"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>

              {product?.paymentOption && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Payment Method
                    </p>
                  </div>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {product.paymentOption}
                  </p>
                </div>
              )}

              {product?.paymentOption && (
                <button
                  type="submit"
                  disabled={disableSubmit}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-lg transition-all transform ${
                    disableSubmit
                      ? "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#3badcd] to-[#2f97b7] hover:from-[#3badcd]/90 hover:to-[#2f97b7]/90 text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105"
                  }`}
                >
                  <ShoppingCart className="h-6 w-6" />
                  {disableSubmit ? "Complete All Fields" : "Place Order"}
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>

      <PurchaseModal
        product={product}
        totalPrice={totalPrice}
        quantity={orderQuantity}
        closeModal={closeModal}
        isOpen={isOpen && modalType === "Stripe"}
      />

      <CodModal
        product={product}
        totalPrice={totalPrice}
        quantity={orderQuantity}
        closeModal={closeModal}
        isOpen={isOpen && modalType === "Cash On Delivery"}
      />
    </div>
  );
};

export default OrderPage;
