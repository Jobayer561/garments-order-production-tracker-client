import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useStatus from "@/hooks/useStatus";
import {
  Package,
  Tag,
  DollarSign,
  Boxes,
  ShoppingCart,
  Video,
  CreditCard,
  Image,
  FileText,
  Sparkles,
} from "lucide-react";

const AddProductForm = () => {
  const { user } = useAuth();
  const [status] = useStatus();
  const axiosSecure = useAxiosSecure();
  const [imagePreviews, setImagePreviews] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post(`/allProducts`, payload),
    onSuccess: () => {
      toast.success("Product added successfully");
      reset();
      setImagePreviews([]);
    },
    onError: () => {
      toast.error("Failed to add product");
    },
  });

  const handleImagePreview = (value) => {
    const urls = value
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);
    setImagePreviews(urls);
  };

  const onSubmit = async (data) => {
    const productData = {
      title: data.title,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      availableQuantity: Number(data.availableQty),
      minimumOrderQuantity: Number(data.minOrderQty),
      images: data.images
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
      showOnHomePage: false,
      paymentOption: data.payment,
      email: user?.email,
    };

    if (data.video) productData.demoVideo = data.video;

    if (
      productData.price < 1 ||
      productData.availableQuantity < 1 ||
      productData.minimumOrderQuantity < 1
    )
      return;
    console.log(productData);
    await mutateAsync(productData);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 py-12">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="space-y-8 max-w-6xl mx-auto">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#3badcd] to-[#2f97b7] shadow-lg shadow-cyan-500/30 mb-4">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h1 className="md:text-5xl text-3xl font-bold bg-linear-to-r from-[#3badcd] to-[#2f97b7] bg-clip-text text-transparent">
              Add New Product
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Fill in the details to add a product to your inventory
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 p-8 md:p-10 backdrop-blur-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Tag className="h-4 w-4 text-[#3badcd]" />
                    Product Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter product title"
                      className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                      {...register("title", { required: "Title is required" })}
                    />
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                  {errors.title && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Boxes className="h-4 w-4 text-[#3badcd]" />
                    Category
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none appearance-none cursor-pointer"
                    {...register("category", {
                      required: "Category is required",
                    })}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a Category
                    </option>
                    <option>Shirt</option>
                    <option>Pant</option>
                    <option>Jacket</option>
                    <option>Blazer</option>
                    <option>Saree</option>
                    <option>Gown</option>
                    <option>Palazoo</option>
                    <option>Belt</option>
                    <option>Other</option>
                  </select>
                  {errors.category && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <DollarSign className="h-4 w-4 text-[#3badcd]" />
                    Price
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      placeholder="0.00"
                      className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 1, message: "Price must be at least 1" },
                      })}
                    />
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                  {errors.price && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Package className="h-4 w-4 text-[#3badcd]" />
                    Available Quantity
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter stock quantity"
                      className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                      {...register("availableQty", {
                        required: "Available Quantity is required",
                        min: {
                          value: 1,
                          message: "Quantity must be at least 1",
                        },
                      })}
                    />
                    <Boxes className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                  {errors.availableQty && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                      {errors.availableQty.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <ShoppingCart className="h-4 w-4 text-[#3badcd]" />
                    Minimum Order Quantity
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter minimum order"
                      className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                      {...register("minOrderQty", {
                        required: "Minimum Order Quantity is required",
                        min: {
                          value: 1,
                          message: "Minimum order must be at least 1",
                        },
                      })}
                    />
                    <ShoppingCart className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                  {errors.minOrderQty && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                      {errors.minOrderQty.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Video className="h-4 w-4 text-[#3badcd]" />
                    Demo Video{" "}
                    <span className="text-xs text-slate-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter video URL"
                      className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                      {...register("video")}
                    />
                    <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <CreditCard className="h-4 w-4 text-[#3badcd]" />
                    Payment Options
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none appearance-none cursor-pointer"
                    {...register("payment", {
                      required: "Payment option is required",
                    })}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a Payment Method
                    </option>
                    <option>Stripe</option>
                    <option>Cash On Delivery</option>
                  </select>
                  {errors.payment && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                      {errors.payment.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Sparkles className="h-4 w-4 text-[#3badcd]" />
                    Show On HomePage
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    value="false"
                    readOnly
                    {...register("showOnHomePage")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <Image className="h-4 w-4 text-[#3badcd]" />
                  Product Images
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Image URLs (comma separated)"
                    className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                    {...register("images", {
                      required: "Please provide at least one image URL",
                    })}
                    onChange={(e) => handleImagePreview(e.target.value)}
                  />
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                </div>
                {errors.images && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                    {errors.images.message}
                  </p>
                )}

                {imagePreviews.length > 0 && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3">
                      Image Preview ({imagePreviews.length})
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {imagePreviews.map((img, idx) => (
                        <div
                          key={idx}
                          className="group relative aspect-square overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-[#3badcd] transition-all"
                        >
                          <img
                            src={img}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                            alt={`Preview ${idx}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="absolute bottom-2 left-2 text-white text-xs font-semibold">
                              #{idx + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <FileText className="h-4 w-4 text-[#3badcd]" />
                  Product Description
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none resize-none"
                  placeholder="Enter detailed product description..."
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
                {errors.description && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status !== "approve" || isLoading}
                  className={`w-full py-4 rounded-full font-bold text-lg text-white shadow-lg transition-all duration-300 ${
                    status !== "approve" || isLoading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-linear-to-r from-[#3badcd] to-[#2f97b7] hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving Product...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Add Product
                    </span>
                  )}
                </button>
                {status !== "approve" && (
                  <p className="text-center text-sm text-amber-600 dark:text-amber-400 mt-3 flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Your account needs approval to add products
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
