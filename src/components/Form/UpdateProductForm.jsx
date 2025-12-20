import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateProductForm = ({ product, closeModal, refetch }) => {
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
      });
  };

  return (
    <div className="w-full flex justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl p-8">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Title</label>
              <input
                className="input input-info w-full mt-2"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label>Category</label>
              <select
                className="select select-info w-full mt-2"
                {...register("category", { required: "Category is required" })}
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Price</label>
              <input
                type="number"
                step={"any"}
                className="input input-info w-full mt-2"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be at least 1" },
                })}
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label>Payment Option</label>
              <select
                className="select select-info w-full mt-2"
                {...register("payment", { required: true })}
              >
                <option value="">Select payment</option>
                <option>Stripe</option>
                <option>Cash On Delivery</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 ">
            <div>
              <label>Demo Video (Optional)</label>
              <input
                type="text"
                placeholder="Demo video URL"
                className="input input-info w-full mt-2"
                {...register("video")}
              />
            </div>
          </div>

          <div>
            <label>Product Images</label>
            <input
              className="input input-info w-full mt-2"
              {...register("images", { required: true })}
              onChange={(e) => handleImagePreview(e.target.value)}
            />
          </div>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {imagePreviews.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="h-32 w-full object-cover rounded-lg border"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ))}
            </div>
          )}

          <div>
            <label>Description</label>
            <textarea
              className="textarea textarea-info w-full mt-2"
              {...register("description", { required: true })}
            />
          </div>

          <button className="block w-full py-3 bg-[#3badcd] hover:bg-[#3badcd]/80 hover:scale-105 transition-transform text-white font-semibold rounded-full">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;
