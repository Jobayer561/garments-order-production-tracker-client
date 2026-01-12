import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const MotionH2 = motion.h2;
  const MotionP = motion.p;
  const MotionForm = motion.form;
  const MotionInput = motion.input;
  const MotionButton = motion.button;
  const MotionDiv = motion.div;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", msg: "Please enter a valid email." });
      return;
    }
    setTimeout(() => {
      setStatus({
        type: "ok",
        msg: "Subscribed! You'll receive updates on orders & production.",
      });
      setEmail("");
    }, 500);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-2 md:px-6 text-center">
        <MotionH2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-bold mb-3 text-[#3BADCD]"
        >
          Newsletter / Subscription
        </MotionH2>
        <MotionP
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
          className="text-gray-500 mb-6"
        >
          Get updates on garments orders, production timelines, and shipment
          status.
        </MotionP>
        <MotionForm
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <MotionInput
            whileFocus={{ scale: 1.01 }}
            type="email"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-2xl border border-gray-200 bg-white/90 backdrop-blur input input-info placeholder:text-gray-500 text-sm shadow-sm hover:shadow-md transition-all focus:border-[#3BADCD] focus:ring-4 focus:ring-[#3BADCD]/30"
          />
          <MotionButton
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -2, transition: { duration: 0.12 } }}
            type="submit"
            className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold shadow-sm hover:border-[#3BADCD] hover:text-[#3BADCD]"
          >
            Subscribe
          </MotionButton>
        </MotionForm>
        {status && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-3 text-sm ${
              status.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {status.msg}
          </MotionDiv>
        )}
      </div>
    </section>
  );
}
