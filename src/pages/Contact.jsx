import React from "react";
import Container from "@/components/Shared/Container";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <Container>
      <div className="max-w-3xl mx-auto py-28 space-y-10 text-center px-4">
        <h1 className="text-4xl font-bold text-[#3BADCD]">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          Have any questions or need support? Reach out to us using the contact
          information below.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="flex flex-col items-center space-y-3">
            <FaMapMarkerAlt className="text-3xl text-[#3BADCD]" />
            <h3 className="font-semibold text-lg">Address</h3>
            <p className="text-gray-500">
              123 Garments Flow Street, Dhaka, Bangladesh
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <FaEnvelope className="text-3xl text-[#3BADCD]" />
            <h3 className="font-semibold text-lg">Email</h3>
            <p className="text-gray-500">support@garmentsflow.com</p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <FaPhoneAlt className="text-3xl text-[#3BADCD]" />
            <h3 className="font-semibold text-lg">Phone</h3>
            <p className="text-gray-500">+880 1234 567 890</p>
          </div>
        </div>

        <div className="mt-12 text-gray-600 text-lg">
          <p>
            Our team is ready to help you with any questions regarding your
            orders, production tracking, or using GarmentsFlow efficiently.
          </p>
          <p className="mt-2">
            You can also reach us through our social media channels for faster
            updates.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
