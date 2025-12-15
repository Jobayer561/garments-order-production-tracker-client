import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-2xl md:w-4/5 lg:w-2/5 overflow-hidden">
        <div className="h-40 bg-linear-to-r from-cyan-400 to-blue-500 relative">
          <img
            src={profile?.image || user?.photoURL}
            alt="profile"
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full h-24 w-24 object-cover"
          />
        </div>

        {/* Profile Content */}
        <div className="pt-16 pb-6 px-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {profile?.name || user?.displayName}
          </h2>
          <p className="text-md text-gray-500">{profile?.role || "Buyer"}</p>
          <p className="mt-2 text-xs text-gray-400">User ID: {user?.uid}</p>

          {/* Buttons */}
          <div className="mt-4 flex justify-center gap-4 flex-wrap">
            <button className="bg-[#3badcd] text-white px-6 py-2  hover:bg-[#3badcd]/80 rounded-full transition">
              Update Profile
            </button>
            <button className="bg-[#3badcd] text-white px-6 py-2 rounded-full hover:bg-[#3badcd]/80 transition">
              Change Password
            </button>
          </div>

          {/* Email */}
          <p className="mt-4 text-gray-600 text-sm">
            <span className="font-semibold">Email:</span>{" "}
            {profile?.email || user?.email}
          </p>

          {/* Reason & Feedback (conditionally) */}
          {profile?.status === "suspend" && (
            <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="font-semibold text-red-300">
                You have been Suspended
              </p>
              <p className="text-red-600 font-semibold">
                Reason: {profile.reason}
              </p>
              <p className="text-red-600 font-semibold mt-1">
                Feedback: {profile.feedback}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
