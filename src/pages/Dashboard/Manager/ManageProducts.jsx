import ProductDataRow from "@/components/Dashboard/TableRows/ProductDataRow";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const ManageProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  const {
    data: products = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["products", searchText, category],
    queryFn: async () => {
      const res = await axiosSecure(
        `/manager-created?email=${user?.email}&search=${searchText}&category=${category}`
      );
      console.log("from manage", products);
      return res.data;
    },
    keepPreviousData: true,
  });
  return (
    <div>
      {" "}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <h1 className="text-3xl font-bold text-center text-[#3badcd]">
                Product Created By Manager
              </h1>

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
                  <p className="mb-2 font-semibold">Filter By Category</p>
                  <select
                    className="select select-info w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All category</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Blazer">Blazer</option>
                    <option value="Saree">Saree</option>
                    <option value="Gown">Gown</option>
                    <option value="Palazoo">Palazoo</option>
                    <option value="Belt">Belt</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Category
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Payment Mode
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <ProductDataRow refetch={refetch} key={product._id} product={product} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
