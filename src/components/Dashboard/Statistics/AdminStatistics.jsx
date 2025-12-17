import { FaUsers, FaClipboardList, FaHeadset } from "react-icons/fa";
import { BsLightningChargeFill, BsMegaphoneFill } from "react-icons/bs";

const AdminStatistics = () => {
  const quickActions = [
    {
      title: "Create purchase order",
      body: "Generate and approve garment POs for new styles, restocks, and seasonal collections in one place.",
      cta: "Open GarmentsFlow POs",
      icon: FaClipboardList,
      accent: "from-emerald-500 to-teal-500",
    },
    {
      title: "Onboard suppliers",
      body: "Add mills and factories, assign them to styles, and share tech packs or production briefs instantly.",
      cta: "Open supplier desk",
      icon: FaUsers,
      accent: "from-indigo-500 to-sky-500",
    },
    {
      title: "Track shipments & returns",
      body: "Monitor cartons in transit, confirm deliveries, and manage return approvals without leaving GarmentsFlow.",
      cta: "Open logistics board",
      icon: FaHeadset,
      accent: "from-amber-500 to-orange-500",
    },
  ];

  const announcements = [
    {
      title: "GarmentsFlow workspace",
      detail:
        "Admins, merchandisers, and buyers share this hub. Start with purchase orders, supplier onboarding, or logistics.",
    },
    {
      title: "New shipment lane",
      detail:
        "Deliveries and returns now flow in a single lane. Approvals, notes, and carton details stay together.",
    },
    {
      title: "Maintenance notice",
      detail:
        "Scheduled downtime this Sunday at 02:00 UTC for system upgrades. Plan your orders accordingly.",
    },
  ];

  const guides = [
    "Step‑by‑step guide to raising and approving garment POs",
    "Best practices for keeping supplier and inventory records clean",
    "How to manage notifications for buyers, merchandisers, and admins in GarmentsFlow",
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-emerald-500 blur-3xl" />
          <div className="absolute right-0 bottom-10 h-48 w-48 rounded-full bg-indigo-500 blur-3xl" />
        </div>
        <div className="relative grid gap-10 p-8 md:p-10 lg:grid-cols-12 lg:items-center">
          <div className="space-y-5 lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-100">
              <BsLightningChargeFill /> GarmentsFlow workspace
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              One simple hub for admins, managers, and buyers.
            </h1>
            <p className="text-sm text-slate-200">
              No charts, no noise. Create purchase orders, collaborate with
              suppliers, track shipments, and get help fast — all in
              GarmentsFlow.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-emerald-100">
              <span className="rounded-full bg-white/10 px-3 py-1">
                Create POs and approvals
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1">
                Supplier collaboration
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1">
                Shipments & returns in view
              </span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-100">
                  <BsMegaphoneFill />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    Latest in GarmentsFlow
                  </p>
                  <p className="text-xs text-emerald-100">
                    Workspace refresh — all stats removed so everyone can focus
                    on actions.
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-xl bg-white/5 p-4 text-sm text-slate-100">
                Your orders, approvals, and support are now in one streamlined
                place. Use the quick actions to jump straight into work.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map(({ title, body, cta, icon: Icon, accent }) => (
              <div
                key={title}
                className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-md`}
                >
                  <Icon />
                </div>
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm text-slate-600">{body}</p>
                <button className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800">
                  {cta}
                  <span aria-hidden>→</span>
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Latest Updates
                </p>
                <p className="text-xs text-slate-500">
                  Clear order tracking — no numbers, just steps and guidance.
                </p>
              </div>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {guides.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Announcements
              </p>
              <span className="text-xs text-emerald-600">
                Updated regularly
              </span>
            </div>
            <div className="mt-4 space-y-4">
              {announcements.map(({ title, detail }) => (
                <div
                  key={title}
                  className="space-y-1 rounded-xl border border-slate-100 bg-slate-50 p-3"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {title}
                  </p>
                  <p className="text-sm text-slate-600">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold text-slate-900">
              Need GarmentsFlow help?
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Reach the support team or browse the help desk if you get stuck.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <button className="rounded-full bg-emerald-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-emerald-700">
                Chat now
              </button>
              <button className="rounded-full border border-slate-200 px-3 py-2 font-semibold text-slate-800 hover:border-slate-300">
                View help desk
              </button>
              <button className="rounded-full border border-slate-200 px-3 py-2 font-semibold text-slate-800 hover:border-slate-300">
                Email support
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminStatistics;
