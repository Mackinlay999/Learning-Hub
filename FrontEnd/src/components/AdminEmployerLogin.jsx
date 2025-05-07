import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/AdminEmployerLogin.css";

const AdminEmployerLogin = () => {
  const [activeTab, setActiveTab] = useState("sales");

  const tabVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <div className="admin-students-container min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left Section */}
      <div className="admin-students-left flex-1 flex flex-col justify-center items-start px-8 md:px-20 py-12 bg-black">
        <motion.p
          className="admin-students-brand text-sm tracking-widest text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          TALENT DECODED
        </motion.p>
        <motion.h1
          className="admin-students-title text-4xl md:text-5xl font-bold mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Decode India’s largest talent pool with the power of ✨ AI
        </motion.h1>
        <motion.div
          className="admin-students-bullets mt-6 text-gray-300 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>🧑‍💼 10 crore+ registered jobseekers for all your talent needs</p>
          <p>🧠 Most advanced recruitment AI</p>
        </motion.div>
        <motion.button
          className="admin-students-cta mt-8 px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          Explore our products
        </motion.button>
      </div>

      {/* Right Section */}
      <motion.div
        className="admin-students-right flex-1 bg-white text-black rounded-t-3xl md:rounded-none md:rounded-l-3xl p-6 md:p-12"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70 }}
      >
        {/* Tabs */}
        <div className="admin-students-tabs flex justify-around mb-6 border-b border-gray-300">
          {["Sales enquiry", "Register/Log in"].map((tab, idx) => (
            <button
              key={idx}
              className={`admin-students-tab px-4 py-2 font-medium ${
                activeTab === (idx === 0 ? "sales" : "login")
                  ? "active border-b-4 border-blue-600 text-black"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab(idx === 0 ? "sales" : "login")}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {activeTab === "sales" ? (
            <form className="admin-students-form space-y-4">
              <input
                type="text"
                placeholder="Full name"
                className="admin-students-input w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Mobile number"
                className="admin-students-input w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="email"
                placeholder="Work email"
                className="admin-students-input w-full border border-gray-300 rounded px-4 py-2"
              />
              <div className="admin-students-label text-sm text-gray-600 mt-4">HIRING FOR</div>
              <div className="admin-students-hiring-options flex gap-4 mt-2">
                <button
                  type="button"
                  className="admin-students-hiring-btn flex-1 border border-gray-300 rounded px-4 py-2 hover:bg-blue-100"
                >
                  Your company
                </button>
                <button
                  type="button"
                  className="admin-students-hiring-btn flex-1 border border-gray-300 rounded px-4 py-2 hover:bg-blue-100"
                >
                  Your consultancy
                </button>
              </div>
              <button
                type="submit"
                className="admin-students-submit w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Request callback
              </button>
            </form>
          ) : (
            <form className="admin-students-form space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="admin-students-input w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="password"
                placeholder="Password"
                className="admin-students-input w-full border border-gray-300 rounded px-4 py-2"
              />
              <button
                type="submit"
                className="admin-students-submit w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Log in
              </button>
              <p className="admin-students-register text-sm text-center mt-4">
                Don’t have an account?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Register now
                </span>
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminEmployerLogin;
