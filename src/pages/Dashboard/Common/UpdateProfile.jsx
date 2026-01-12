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
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl md:w-4/5 lg:w-2/5 overflow-hidden">
        <div className="h-40 bg-linear-to-r from-cyan-400 to-blue-500 relative flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Update Profile</h1>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
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
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3badcd] dark:bg-slate-800 dark:text-white"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
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
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3badcd] dark:bg-slate-800 dark:text-white"
                placeholder="Enter image URL"
              />
            </div>

            {formData.image && (
              <div className="flex justify-center">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-24 w-24 rounded-full object-cover border-4 border-[#3badcd]"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/150?text=Invalid+URL";
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile?.email || user?.email}
                disabled
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Role
              </label>
              <input
                type="text"
                value={profile?.role || "User"}
                disabled
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-not-allowed"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-[#3badcd] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2f97b7] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Update Profile"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/profile")}
                className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-full font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
