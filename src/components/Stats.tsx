import React from 'react';
import { Mail, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Membership() {
  return (
    <div className="min-h-[400px] ">
      <div className="container mx-auto px-4 py-8">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-white/90 to-black/90 rounded-xl p-6 backdrop-blur-sm">

          <div className="flex items-center gap-4 text-black md:text-black">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-black/10 p-3 rounded-full"
            >
              <Mail className="w-6 h-6" />
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-base md:text-lg font-medium">info@societycis.org</p>
            </motion.div>
          </div>

     
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-black/10 p-3 rounded-full"
            >
              <User className="w-6 h-6 text-black md:text-white" />
            </motion.div>
          </div>

          {/* Right Section with Title and Button */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-right"
            >
              <h1 className="text-xl md:text-2xl font-bold mb-2 text-black md:text-white">
                Membership and Consulting Services
              </h1>
              <p className="text-gray-600 md:text-gray-300 text-sm">
                Will be updated with more information. Stay tuned with the website.
              </p>
            </motion.div>
            <Link to="/membership-form" >
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-300 text-sm"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}