import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomerFeedback = () => {
  const feedbacks = [
    {
      id: 1,
      name: "Ariana Malik",
      product: "Custom T-Shirt Bulk Order",
      description:
        "Order process was smooth and fast. The tracking system kept me updated at every production stage. Quality of stitching and print was excellent.",
      review: "⭐⭐⭐⭐⭐",
      location: "Dhaka, Bangladesh",
      date: "12 Jan 2025",
      img: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 2,
      name: "Rafiul Hasan",
      product: "Polo Shirt Manufacturing",
      description:
        "Good fabric quality and timely delivery. The live production tracking feature is very helpful for monitoring orders.",
      review: "⭐⭐⭐⭐",
      location: "Chittagong, Bangladesh",
      date: "03 Dec 2024",
      img: "https://i.pravatar.cc/100?img=8",
    },
    {
      id: 3,
      name: "Mehjabin Rahman",
      product: "Women’s Top Sample Order",
      description:
        "Received the sample exactly as requested. Cutting and finishing were very neat. Tracking updates were accurate and quick.",
      review: "⭐⭐⭐⭐⭐",
      location: "Rajshahi, Bangladesh",
      date: "05 Feb 2025",
      img: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 4,
      name: "Talha Jisan",
      product: "Hoodie Batch Production",
      description:
        "Affordable pricing with great quality. Order progress updates were always on time. Their customer support responds very quickly.",
      review: "⭐⭐⭐⭐",
      location: "Sylhet, Bangladesh",
      date: "18 Nov 2024",
      img: "https://i.pravatar.cc/100?img=19",
    },
    {
      id: 5,
      name: "Nafisa Noor",
      product: "Corporate Uniform Order",
      description:
        "Very professional service. Uniform quality is top notch and well-stitched. Tracking panel made it easy to monitor production stages.",
      review: "⭐⭐⭐⭐⭐",
      location: "Barishal, Bangladesh",
      date: "22 Jan 2025",
      img: "https://i.pravatar.cc/100?img=16",
    },
    {
      id: 6,
      name: "Imran Hossain",
      product: "Joggers Manufacturing",
      description:
        "Fabric quality was impressive. Delivery was on time and order tracking helped me plan my store restock easily.",
      review: "⭐⭐⭐⭐",
      location: "Khulna, Bangladesh",
      date: "30 Dec 2024",
      img: "https://i.pravatar.cc/100?img=11",
    },
    {
      id: 7,
      name: "Sadia Akther",
      product: "Kids Wear Production",
      description:
        "Extremely satisfied with the final output. Sizes were accurate and stitching quality was excellent. Very reliable service.",
      review: "⭐⭐⭐⭐⭐",
      location: "Dhaka, Bangladesh",
      date: "10 Feb 2025",
      img: "https://i.pravatar.cc/100?img=18",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-[1350px] mx-auto px-4 mt-10 mb-10 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#3BADCD]">
        Customer Feedback
      </h2>
      <Slider {...settings}>
        {feedbacks.map((item) => (
          <div key={item.id}>
            <div className=" rounded-xl shadow-md border border-gray-50/35 mb-6 p-6 h-auto hover:scale-105 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover hover:scale-105"
                />
                <div>
                  <h3 className="font-semibold text-lg text-[#3BADCD]">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.location}</p>
                </div>
              </div>

              <p className=" font-medium">{item.product}</p>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {item.description}
              </p>

              <p className="text-yellow-500 text-xl mt-3">{item.review}</p>

              <p className="text-right text-xs text-gray-400 mt-2">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomerFeedback;
