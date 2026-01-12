import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const UpdateManagerProductForm = ({ product, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [imagePreviews, setImagePreviews] = useState(
    () => product?.images || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        category: product.category || "",
        price: product.price || "",
        minOrderQty: product.minimumOrderQuantity,
        availableQty: product.availableQuantity,
        video: product.demoVideoLink,
        payment: product.paymentOption,
        images: product.images ? product.images.join(", ") : "",
      });
    }
  }, [product, reset]);

  const handleImagePreview = (value) => {
    const urls = value
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);
    setImagePreviews(urls);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const updatedProduct = {
      title: data.title,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      minimumOrderQuantity: Number(data.minOrderQty),
      availableQuantity: Number(data.availableQty),
      paymentOption: data.payment,
      demoVideoLink: data.video,
      images: data.images
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean),
    };

    try {
      const res = await axiosSecure.patch(
        `/manage-products/${product._id}`,
        updatedProduct
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        closeModal();
        toast.success("Product updated successfully! ✨");
      } else {
        toast.error("No changes were made");
      }
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#3badcd] to-[#2f97b7] shadow-lg shadow-cyan-500/30">
              <RefreshCw className="h-8 w-8 text-white" />
            </div>
            <h1 className="md:text-4xl text-2xl font-bold bg-linear-to-r from-[#3badcd] to-[#2f97b7] bg-clip-text text-transparent">
              Update Product
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
              Modify product details and keep your inventory fresh
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 p-8 md:p-10 backdrop-blur-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Tag className="h-4 w-4 text-[#3badcd]" />
                    Product Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product title"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
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
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none cursor-pointer"
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
                      <AlertCircle className="h-3 w-3" />
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Price & Available Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <DollarSign className="h-4 w-4 text-[#3badcd]" />
                    Price
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="0.00"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 1, message: "Price must be at least 1" },
                    })}
                  />
                  {errors.price && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <ShoppingCart className="h-4 w-4 text-[#3badcd]" />
                    Available Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="Enter available quantity"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                    {...register("availableQty", {
                      required: "Available Quantity is required",
                      min: { value: 1, message: "Quantity must be at least 1" },
                    })}
                  />
                  {errors.availableQty && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.availableQty.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Min Order Qty & Video */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Boxes className="h-4 w-4 text-[#3badcd]" />
                    Minimum Order Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="Enter minimum order quantity"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                    {...register("minOrderQty", {
                      required: "Minimum Order Quantity is required",
                      min: {
                        value: 1,
                        message: "Minimum order must be at least 1",
                      },
                    })}
                  />
                  {errors.minOrderQty && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.minOrderQty.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Video className="h-4 w-4 text-[#3badcd]" />
                    Demo Video (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Paste demo video URL (optional)"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                    {...register("video")}
                  />
                </div>
              </div>

              {/* Row 4: Payment & Show on Home */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <CreditCard className="h-4 w-4 text-[#3badcd]" />
                    Payment Options
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none cursor-pointer"
                    {...register("payment", {
                      required: "Payment option is required",
                    })}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Payment Method
                    </option>
                    <option>Stripe</option>
                    <option>Cash On Delivery</option>
                  </select>
                  {errors.payment && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.payment.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-3 pt-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <Image className="h-4 w-4 text-[#3badcd]" />
                  Product Images
                </label>
                <input
                  type="text"
                  placeholder="Paste image URLs separated by commas"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none"
                  {...register("images", {
                    required: "Please provide at least one image URL",
                  })}
                  onChange={(e) => handleImagePreview(e.target.value)}
                />
                {errors.images && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.images.message}
                  </p>
                )}

                {imagePreviews.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide">
                      Image Preview ({imagePreviews.length})
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {imagePreviews.map((img, idx) => (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 aspect-square hover:border-[#3badcd] transition-all"
                        >
                          <img
                            src={img}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            alt={`Preview ${idx + 1}`}
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/150?text=Image+Error";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description Section */}
              <div className="space-y-2 pt-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <FileText className="h-4 w-4 text-[#3badcd]" />
                  Product Description
                </label>
                <textarea
                  rows="5"
                  placeholder="Enter detailed product description..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none resize-none"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 text-white font-semibold bg-linear-to-r from-[#3badcd] to-[#2f97b7] hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed py-3 rounded-full transition-all duration-300"
                >
                  <RefreshCw
                    className={`h-5 w-5 ${isSubmitting ? "animate-spin" : ""}`}
                  />
                  {isSubmitting ? "Updating..." : "Update Product"}
                </button>
              
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateManagerProductForm;
