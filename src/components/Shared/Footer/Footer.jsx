import React from "react";
import twitter from "../../../assets/images/twitter.png";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content px-10 py-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link to="/" className="logo text-xl font-semibold flex items-center">
            <h1 className="text-[#3BADCD]">GarmentsFLow</h1>
          </Link>

          <p className="text-gray-500 text-md max-w-xs">
            GarmentsFlow is a modern web-based system that streamlines the
            garment manufacturing process. From receiving buyer orders to
            tracking every production stage. 
           
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h1 className="font-semibold text-lg mb-2">Quick Links</h1>
          <nav className="flex flex-col gap-4 text-gray-500 text-lg">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h1 className="font-semibold text-lg mb-2">Services</h1>
          <nav className="flex flex-col gap-4 text-gray-500 text-lg">
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
        </div>

        <div className="flex flex-col items-center md:items-start gap-5">
          <h1 className="font-semibold text-lg mb-2">Social Media</h1>

          <div className="flex gap-5">
            <img
              className="w-7 h-7 cursor-pointer bg-white"
              src={twitter}
              alt=""
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="fill-current cursor-pointer"
              viewBox="0 0 24 24"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="fill-current cursor-pointer"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500">
          Copyright © {new Date().getFullYear()} — All rights reserved by{" "}
          <span className="font-semibold text-[#3BADCD]">GarmentsFlow</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
