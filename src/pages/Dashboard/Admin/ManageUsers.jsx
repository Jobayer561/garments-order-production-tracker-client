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
    <div className="container mx-auto px-4 sm:px-8">
      <div className="">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="relative inline-block min-w-full shadow rounded-lg overflow-hidden ">
            <h2 className="text-3xl font-bold text-center py-6 text-[#3badcd]">
              Total Users : {users.length}
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-4">
              <div className="w-full md:w-1/4">
                <p className="mb-2 font-semibold">Search User</p>
                <label className="input input-info flex items-center gap-2 w-full">
                  <svg
                    className="h-4 w-4 opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </g>
                  </svg>
                  <input
                    type="search"
                    placeholder="Search by name or email"
                    className="grow"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </label>
              </div>

              <div className="w-full md:w-1/4">
                <p className="mb-2 font-semibold">Filter By Role</p>
                <select
                  className="select select-info w-full"
                  value={role}
                  onChange={(e) => setRole(e.target.value.trim())}
                >
                  <option value="">All Roles</option>
                  <option value="Manager">Manager</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b  border-gray-200  text-left text-sm uppercase font-normal">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b  border-gray-200 text-left text-sm uppercase font-normal">
                        Email
                      </th>
                      <th className="px-5 py-3 border-b  border-gray-200 text-left text-sm uppercase font-normal">
                        Role
                      </th>
                      <th className="px-5 py-3 border-b  border-gray-200 text-left text-sm uppercase font-normal">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b  border-gray-200 text-left text-sm uppercase font-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-6">
                          No users found
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

                {isFetching && (
                  <div className="flex justify-center py-4">
                    <LoadingSpinner />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
