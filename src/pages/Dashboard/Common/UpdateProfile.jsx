import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile?email=${user?.email}`);
      return res.data;
    },
  });

  const [formData, setFormData] = useState({
    name: profile?.name || user?.displayName || "",
    image: profile?.image || user?.photoURL || "",
  });

  const [updating, setUpdating] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await updateUserProfile(formData.name, formData.image);

      await axiosSecure.patch("/profile", {
        name: formData.name,
        image: formData.image,
      });

      toast.success("Profile updated successfully!");
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (profile && !formData.name) {
    setFormData({
      name: profile?.name || user?.displayName || "",
      image: profile?.image || user?.photoURL || "",
    });
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 flex justify-center items-start min-h-full">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
          <div className="h-32 sm:h-40 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-black/10"></div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white relative z-10 drop-shadow-lg">
              Update Profile
            </h1>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3badcd] bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 transition text-sm sm:text-base placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                >
                  Profile Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3badcd] bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 transition text-sm sm:text-base placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="Enter image URL"
                />
              </div>

              {formData.image && (
                <div className="flex justify-center py-2">
                  <div className="relative group">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-4 border-[#3badcd] shadow-lg ring-2 ring-[#3badcd]/50 group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150?text=Invalid+URL";
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profile?.email || user?.email}
                  disabled
                  className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 cursor-not-allowed text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={profile?.role || "User"}
                  disabled
                  className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 cursor-not-allowed text-sm sm:text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-gradient-to-r from-[#3badcd] to-[#2d8ca8] text-white px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
                >
                  {updating ? (
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    "Update Profile"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/profile")}
                  className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 hover:scale-105 transform transition-all duration-200 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
