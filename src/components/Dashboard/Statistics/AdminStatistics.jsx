import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ArrowUpRight,
  Package,
  CheckCircle,
  Clock3,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const numberFmt = (n) => (Number.isFinite(n) ? n.toLocaleString() : "0");
const axisColor = "#94a3b8";
const gridColor = "rgba(148, 163, 184, 0.25)";

const AdminStatistics = () => {
  const baseURL = import.meta.env.VITE_API_URL;

  const { data: productsRes } = useQuery({
    queryKey: ["dashboard", "products"],
    queryFn: async () => {
      const res = await axios.get(`${baseURL}/allProducts?limit=100`);
      return res.data;
    },
  });

  const { data: pendingOrders } = useQuery({
    queryKey: ["dashboard", "orders", "pending"],
    queryFn: async () => {
      const res = await axios.get(`${baseURL}/orders-pending`);
      return res.data || [];
    },
  });

  const { data: approvedOrders } = useQuery({
    queryKey: ["dashboard", "orders", "approved"],
    queryFn: async () => {
      const res = await axios.get(`${baseURL}/approve-orders`);
      return res.data || [];
    },
  });

  const items = productsRes?.items || [];

  const summary = useMemo(() => {
    const totalProducts = productsRes?.total || items.length;
    const lowStock = items.filter(
      (p) => Number(p.availableQuantity) <= 5
    ).length;
    const totalPending = pendingOrders?.length || 0;
    const totalApproved = approvedOrders?.length || 0;
    const approvedValue = (approvedOrders || []).reduce(
      (sum, o) => sum + (Number(o.totalPrice) || 0),
      0
    );
    return {
      totalProducts,
      lowStock,
      totalPending,
      totalApproved,
      approvedValue,
    };
  }, [approvedOrders, items, pendingOrders, productsRes?.total]);

  const ordersByDay = useMemo(() => {
    const combined = [...(approvedOrders || []), ...(pendingOrders || [])];
    const map = new Map();

    combined.forEach((o) => {
      const date = new Date(
        o.createdAt || o.created_at || o.updatedAt || o.updated_at || Date.now()
      );
      const key = date.toISOString().slice(0, 10);
      map.set(key, (map.get(key) || 0) + 1);
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .slice(-8)
      .map(([label, value]) => ({
        label: label.slice(5),
        value,
      }));
  }, [approvedOrders, pendingOrders]);

  const stockBars = useMemo(() => {
    return [...items]
      .filter((p) => typeof p.availableQuantity === "number")
      .sort((a, b) => a.availableQuantity - b.availableQuantity)
      .slice(0, 8)
      .map((p) => ({
        label: (p.title || p.name || "Item").slice(0, 15),
        value: p.availableQuantity,
      }));
  }, [items]);

  const latestOrders = useMemo(() => {
    return [...(approvedOrders || []), ...(pendingOrders || [])]
      .sort(
        (a, b) =>
          new Date(b.createdAt || b.updatedAt) -
          new Date(a.createdAt || a.updatedAt)
      )
      .slice(0, 6);
  }, [approvedOrders, pendingOrders]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border-2 border-gray-50/35 bg-white p-6 shadow-sm ">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-300">
              Dashboard Overview
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Garments orders & inventory
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Live data from orders and stock
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-[#3badcd] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2f97b7]">
            Refresh <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Products"
            value={numberFmt(summary.totalProducts)}
            hint="Across catalog"
            icon={Package}
            accent="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"
          />
          <StatCard
            title="Pending Orders"
            value={numberFmt(summary.totalPending)}
            hint="Awaiting approval"
            icon={Clock3}
            accent="bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200"
          />
          <StatCard
            title="Approved Orders"
            value={numberFmt(summary.totalApproved)}
            hint="Ready to process"
            icon={CheckCircle}
            accent="bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-200"
          />
          <StatCard
            title="Low Stock Items"
            value={numberFmt(summary.lowStock)}
            hint="≤ 5 units left"
            icon={AlertTriangle}
            accent="bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200"
          />
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border-2 bg-white p-6 shadow-sm border-gray-50/35 dark:bg-slate-900">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-gray-400">
                  Orders by day
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  Last 8 days
                </p>
              </div>
              <span className="text-xs font-semibold text-[#3badcd]">Live</span>
            </div>

            <div className="mt-4 px-2 sm:px-0">
              <div className="h-56 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={ordersByDay}
                    margin={{ top: 20, right: 10, left: 0, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 12, fill: axisColor }}
                      tickLine={{ stroke: axisColor }}
                      axisLine={{ stroke: axisColor }}
                    />
                    <YAxis
                      allowDecimals={false}
                      width={36}
                      tick={{ fontSize: 12, fill: axisColor }}
                      tickLine={{ stroke: axisColor }}
                      axisLine={{ stroke: axisColor }}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3badcd"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 bg-white p-6 shadow-sm border-gray-50/35 dark:bg-slate-900">
            <p className="font-semibold text-gray-400">
              Low stock snapshot
            </p>

            <div className="mt-4 px-2 sm:px-0">
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stockBars}
                    margin={{ top: 20, right: 10, left: 0, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis
                      dataKey="label"
                      interval={0}
                      angle={-35}
                      textAnchor="end"
                      height={70}
                      tick={{ fontSize: 12, fill: axisColor }}
                      tickLine={{ stroke: axisColor }}
                      axisLine={{ stroke: axisColor }}
                    />
                    <YAxis
                      width={36}
                      tick={{ fontSize: 12, fill: axisColor }}
                      tickLine={{ stroke: axisColor }}
                      axisLine={{ stroke: axisColor }}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3badcd" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <RecentOrdersTable orders={latestOrders} />
        </div>
      </section>
    </div>
  );
};

function StatCard({ title, value, hint, icon: Icon, accent }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-700/60 dark:bg-slate-900">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold text-gray-400">{title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">{hint}</p>
        </div>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-[#3badcd]">{value}</p>
    </div>
  );
}

function RecentOrdersTable({ orders }) {
  return (
    <div className="rounded-2xl border-2 border-gray-50/35 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900">
      <p className="font-semibold text-gray-400">Recent orders</p>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm text-slate-800 dark:text-slate-100">
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td className="py-2 text-slate-700 dark:text-slate-100">
                  {o?.buyer?.name || "—"}
                </td>
                <td className="text-slate-700 dark:text-slate-100">
                  {o?.product?.title || "—"}
                </td>
                <td className="font-semibold text-slate-900 dark:text-white">
                  ${o.totalPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminStatistics;
