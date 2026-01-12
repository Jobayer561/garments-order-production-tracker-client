import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-4 sm:p-6 md:p-8 flex justify-center items-start min-h-full">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
          <div className="h-32 sm:h-40 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <img
              src={profile?.image}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              alt="profile"
              className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 border-4 border-white dark:border-slate-700 rounded-full h-20 w-20 sm:h-24 sm:w-24 object-cover shadow-lg ring-2 ring-[#3badcd]/50"
            />
          </div>

          <div className="pt-12 sm:pt-16 pb-6 px-4 sm:px-6 md:px-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
              {profile?.name}
            </h2>
            <p className="text-sm sm:text-md text-[#3badcd] dark:text-[#3badcd] font-semibold mt-1">
              {profile?.role}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              User ID: {user?.uid}
            </p>

            <div className="mt-6 w-full flex justify-center">
              <button
                onClick={() => navigate("/dashboard/update-profile")}
                className="bg-gradient-to-r from-[#3badcd] to-[#2d8ca8] text-white px-6 sm:px-8 py-2.5 sm:py-3 hover:shadow-lg hover:scale-105 transform transition-all duration-200 rounded-full font-semibold text-sm sm:text-base"
              >
                Update Profile
              </button>
            </div>

            <div className="mt-6 bg-gray-50 dark:bg-slate-700/50 p-3 sm:p-4 rounded-xl">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 break-all">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Email:
                </span>{" "}
                {profile?.email || user?.email}
              </p>
            </div>

            {profile?.status === "suspend" && (
              <div className="mt-6 bg-red-50 dark:bg-red-900/20 p-4 sm:p-5 rounded-xl border-2 border-red-200 dark:border-red-800">
                <p className="font-bold text-red-600 dark:text-red-400 text-base sm:text-lg">
                  ⚠️ Account Suspended
                </p>
                <p className="text-red-700 dark:text-red-300 font-semibold mt-2 text-sm sm:text-base">
                  <span className="font-bold">Reason:</span> {profile.reason}
                </p>
                <p className="text-red-700 dark:text-red-300 font-semibold mt-2 text-sm sm:text-base">
                  <span className="font-bold">Feedback:</span>{" "}
                  {profile.feedback}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
