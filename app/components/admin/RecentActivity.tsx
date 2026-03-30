"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";

interface RecentActivityProps {
  title: string;
  data: any[];
  type: "contact" | "project";
}

export function RecentActivity({ title, data, type }: RecentActivityProps) {
  const getTypeIcon = () => {
    if (type === "contact") {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    );
  };

  const renderItem = (item: any, index: number) => {
    if (type === "contact") {
      return (
        <div key={item.id} className="p-4 hover:bg-white/5 dark:hover:bg-white/5 rounded-xl transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-white truncate">
                {item.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {item.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">
                {item.message}
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-500 flex-shrink-0">
              {format(new Date(item.createdAt), "MMM d, h:mm a")}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div key={item.id} className="p-4 hover:bg-white/5 dark:hover:bg-white/5 rounded-xl transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 dark:text-white truncate">
              {item.title}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {item.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {item.featured && (
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                  Featured
                </span>
              )}
              {item.hidden && (
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  Hidden
                </span>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-500 flex-shrink-0">
            {format(new Date(item.createdAt), "MMM d")}
          </span>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          {getTypeIcon()}
          {title}
        </h3>
        <Link
          href={type === "contact" ? "/admin/contacts" : "/admin/projects"}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          View All
        </Link>
      </div>

      <div className="space-y-2">
        {data.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No {type} yet.
          </p>
        ) : (
          data.map((item, index) => renderItem(item, index))
        )}
      </div>
    </motion.div>
  );
}
