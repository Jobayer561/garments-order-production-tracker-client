import {
  Package,
  ShoppingCart,
  ClipboardList,
  Truck,
  CheckCircle,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Browse Products",
      description:
        "Explore our garments collection shirts, pants, jackets. Check MOQ, details, and pricing.",
      icon: <ShoppingCart size={40} />,
    },
    {
      id: 2,
      title: "Place Your Order",
      description:
        "Select quantity, confirm payment option (COD or PayFirst), and submit your order easily.",
      icon: <ClipboardList size={40} />,
    },
    {
      id: 3,
      title: "Order Processing",
      description:
        "Our team prepares your products, verifies quality, and updates the status in your dashboard.",
      icon: <Package size={40} />,
    },
    {
      id: 4,
      title: "Shipping & Tracking",
      description:
        "We ship your garments and update the tracking ID. Follow real-time progress in your tracker.",
      icon: <Truck size={40} />,
    },
    {
      id: 5,
      title: "Delivered Successfully",
      description:
        "You receive your order safely. Confirm delivery and share feedback to help us improve.",
      icon: <CheckCircle size={40} />,
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-8
        "
      >
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-base-100 border border-gray-50/35 shadow-lg rounded-2xl p-8 text-center 
                       flex flex-col items-center hover:shadow-xl transition-all"
          >
            <div className="bg-[#3BADCD]/10 text-[#3BADCD] p-5 rounded-full mb-6">
              {step.icon}
            </div>

            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

            <p className="text-base-content/80">{step.description}</p>

            <span className="text-4xl font-bold text-[#3BADCD] mt-6 opacity-20">
              {step.id}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
