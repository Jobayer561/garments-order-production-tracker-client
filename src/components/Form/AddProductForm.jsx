import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

const AddProductForm = () => {
  const { user } = useAuth();
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
    <div className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="space-y-6 max-w-5xl mx-auto p-6 rounded-2xl shadow-2xl border border-gray-50/35">
          <h1 className="text-4xl text-[#3badcd] font-bold text-center">
            Add Product
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter your Product Title"
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
                  <option>Other</option>
                </select>
                {errors.category && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Price</label>
                <input
                  type="number"
                  step="any"
                  placeholder="Price"
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
                <label>Available Quantity</label>
                <input
                  type="number"
                  placeholder="Enter available Quantity"
                  className="input input-info w-full mt-2"
                  {...register("availableQty", {
                    required: "Available Quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                />
                {errors.availableQty && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.availableQty.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Minimum Order Quantity</label>
                <input
                  type="number"
                  placeholder="Enter Minimum Order Quantity"
                  className="input input-info w-full mt-2"
                  {...register("minOrderQty", {
                    required: "Minimum Order Quantity is required",
                    min: {
                      value: 1,
                      message: "Minimum order must be at least 1",
                    },
                  })}
                />
                {errors.minOrderQty && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.minOrderQty.message}
                  </p>
                )}
              </div>
              <div>
                <label>Demo Video (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter Demo Video (optional)"
                  className="input input-info w-full mt-2"
                  {...register("video")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Payment Options</label>
                <select
                  className="select select-info w-full mt-2"
                  {...register("payment", {
                    required: "Payment option is required",
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a Payment Method
                  </option>
                  <option>PayFirst</option>
                  <option>Cash On Delivery</option>
                </select>
                {errors.payment && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.payment.message}
                  </p>
                )}
              </div>
              <div>
                <label>Show On HomePage</label>
                <input
                  type="text"
                  className="input input-info w-full mt-2"
                  value="false"
                  readOnly
                  {...register("showOnHomePage")}
                />
              </div>
            </div>

            <label>Product Images</label>
            <input
              type="text"
              placeholder="Image URLs (In multiple URL comma separated)"
              className="input input-info w-full mt-2"
              {...register("images", {
                required: "Please provide at least one image URL",
              })}
              onChange={(e) => handleImagePreview(e.target.value)}
            />
            {errors.images && (
              <p className="text-xs text-red-500 mt-1">
                {errors.images.message}
              </p>
            )}

            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {imagePreviews.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className="h-32 w-full object-cover rounded-lg border"
                    alt={`Preview ${idx}`}
                  />
                ))}
              </div>
            )}

            <label>Description</label>
            <textarea
              className="textarea textarea-info w-full my-2"
              placeholder="Enter Product Description"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}

            <button
              type="submit"
              className="block text-white font-semibold bg-[#3badcd] hover:scale-105 hover:opacity-80 py-3 w-full rounded-full transition-transform my-4"
            >
              {isLoading ? "Saving..." : "Submit Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
