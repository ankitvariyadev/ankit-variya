"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  textColor: string;
}

export function StatsCard({
  title,
  value,
  icon,
  color,
  bgColor,
  textColor,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 hover:scale-105 transition-transform"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${bgColor}`}>
          <div className={`${textColor}`}>{icon}</div>
        </div>
      </div>
    </motion.div>
  );
}
