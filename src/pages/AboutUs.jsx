import React from "react";
import { FaShippingFast, FaUsers, FaClipboardList } from "react-icons/fa";
import BannerImg from "../assets/images/banner.jpg";
import Container from "@/components/Shared/Container";

const AboutUs = () => {
  return (
    <div className="py-28">
      <Container>
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-[#3BADCD]">Our Story</h2>
          <p className="text-gray-400 text-lg">
            GarmentsFlow was created to simplify the garment manufacturing
            process. From receiving Buyer orders to tracking every stage of
            production, our platform ensures efficiency, transparency, and
            timely delivery for garment businesses.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mt-12 text-center">
          <div className="p-6 border border-gray-50/35 rounded-lg shadow hover:shadow-lg transition">
            <FaClipboardList className="text-4xl mx-auto text-[#3BADCD]" />
            <h3 className="text-xl font-semibold mt-4">Order Management</h3>
            <p className="text-gray-400 mt-2">
              Easily manage Buyer orders, monitor production progress, and
              maintain records efficiently.
            </p>
          </div>

          <div className="p-6 border border-gray-50/35 rounded-lg shadow hover:shadow-lg transition">
            <FaShippingFast className="text-4xl mx-auto text-[#3BADCD]" />
            <h3 className="text-xl font-semibold mt-4">Production Tracking</h3>
            <p className="text-gray-400 mt-2">
              Track every stage of garment production from cutting to finishing,
              ensuring quality and timely delivery.
            </p>
          </div>

          <div className="p-6 border border-gray-50/35 rounded-lg shadow hover:shadow-lg transition">
            <FaUsers className="text-4xl mx-auto text-[#3BADCD]" />
            <h3 className="text-xl font-semibold mt-4">Team Collaboration</h3>
            <p className="text-gray-400 mt-2">
              Coordinate seamlessly with your production team and vendors,
              keeping everyone aligned and informed.
            </p>
          </div>
        </section>

        <section className="mt-16 max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-[#3BADCD] text-center">
            Our Process
          </h2>
          <ul className=" space-y-2 text-gray-400 text-lg text-center">
            <li>Receive and confirm Buyer orders through the platform.</li>
            <li>Assign production tasks and monitor workflow in real-time.</li>
            <li>Track quality checks and ensure timely completion.</li>
            <li>Update order status and notify Buyers automatically.</li>
          </ul>
        </section>

        <section className="mt-16 text-center mb-6">
          <h2 className="text-3xl font-bold text-[#3BADCD] mb-8">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-50/35 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://i.pravatar.cc/150?img=1"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4">Alice Johnson</h3>
              <p className="text-gray-500 mt-1">Founder & CEO</p>
            </div>

            <div className="p-6 border border-gray-50/35 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://i.pravatar.cc/150?img=2"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4">Michael Smith</h3>
              <p className="text-gray-500 mt-1">Operations Manager</p>
            </div>

            <div className="p-6 border  border-gray-50/35 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://i.pravatar.cc/150?img=3"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4">Sophia Lee</h3>
              <p className="text-gray-500 mt-1">Production Head</p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AboutUs;
