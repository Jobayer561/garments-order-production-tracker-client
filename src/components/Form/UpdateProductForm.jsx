import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Tag,
  Boxes,
  DollarSign,
  CreditCard,
  Video,
  Image,
  FileText,
  Sparkles,
  Package,
  Loader,
} from "lucide-react";

const UpdateProductForm = ({ product, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [imagePreviews, setImagePreviews] = useState(
    () => product?.images || []
  );

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        category: product.category || "",
        price: product.price || "",
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

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const updatedProduct = {
      title: data.title,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      paymentOption: data.payment,
      demoVideoLink: data.video,
      images: data.images
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean),
    };

    axiosSecure
      .patch(`/products/${product._id}`, updatedProduct)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          closeModal();
          toast.success("Product updated successfully");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch(() => {
        toast.error("Update failed");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="w-full flex justify-center items-center bg-linear-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-6">
      <div className="w-full max-w-6xl space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-[#3badcd] to-[#2f97b7] shadow-lg shadow-cyan-500/30">
            <Package className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-linear-to-r from-[#3badcd] to-[#2f97b7] bg-clip-text text-transparent">
            Update Product
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Modify product details and save changes
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 p-8 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
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
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
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
                >
                  <option value="" disabled>
                    Select category
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
                  <CreditCard className="h-4 w-4 text-[#3badcd]" />
                  Payment Option
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none appearance-none cursor-pointer"
                  {...register("payment", {
                    required: "Payment option is required",
                  })}
                >
                  <option value="" disabled>
                    Select payment
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
                          onError={(e) => (e.target.style.display = "none")}
                          alt={`Preview ${idx}`}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
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
                placeholder="Enter detailed product description..."
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#3badcd] focus:ring-4 focus:ring-[#3badcd]/10 transition-all outline-none resize-none"
                {...register("description", {
                  required: "Description is required",
                })}
              />
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
                disabled={isSubmitting}
                className="w-full py-4 rounded-full font-bold text-lg text-white bg-linear-to-r from-[#3badcd] to-[#2f97b7] hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 active:translate-y-0 shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Update Product
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;
