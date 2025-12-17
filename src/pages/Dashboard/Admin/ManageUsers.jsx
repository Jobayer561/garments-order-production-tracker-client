import UserDataRow from "../../../components/Dashboard/TableRows/UserDataRow";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { useState } from "react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState("");

  const {
    data: users = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["users", searchText, role],
    queryFn: async () => {
      const res = await axiosSecure(
        `/user?searchText=${searchText}&role=${role}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  return (
    <div className="min-h-screen  p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-2xl font-bold mb-2 text-center text-[#3badcd]">
                User Management
              </h1>
              <p className="font-semibold">
                Total Users:{" "}
                <span className="font-bold text-[#3badcd]">{users.length}</span>
              </p>
            </div>
          </div>

          {/* Search & Filter Card */}
          <div className=" rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold  mb-3">
                  Search User
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-4 top-3.5 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search by name or email..."
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3badcd] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  Filter By Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value.trim())}
                  className="w-full px-4 py-3 rounded-lg border    border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3badcd] focus:border-transparent transition "
                >
                  <option className="text-[#3badcd] font-semibold" value="">
                    All Roles
                  </option>
                  <option
                    className="text-[#3badcd] font-semibold"
                    value="Manager"
                  >
                    Manager
                  </option>
                  <option
                    className="text-[#3badcd] font-semibold"
                    value="Buyer"
                  >
                    Buyer
                  </option>
                  <option
                    className="text-[#3badcd] font-semibold"
                    value="Admin"
                  >
                    Admin
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className=" backdrop-blur border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <svg
                              className="h-12 w-12"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 6h-6M9 20h6m0 0h5v-2a3 3 0 00-5.856-1.487M9 6a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <p className="font-medium">No users found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <UserDataRow
                          key={user._id}
                          user={user}
                          refetch={refetch}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {isFetching && (
                <div className="flex justify-center py-6 border-t border-slate-200">
                  <LoadingSpinner />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
