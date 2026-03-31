"use client";

import { useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface Visitor {
  id: number;
  ipAddress: string;
  location: string;
  device: string;
  browser: string;
  pagePath: string;
  visitedAt: Date;
}

interface VisitorsTableClientProps {
  initialVisitors: Visitor[];
  totalVisitors: number;
  uniqueIps: { ipAddress: string; _count: { ipAddress: number } }[];
}

export function VisitorsTableClient({
  initialVisitors,
  totalVisitors,
  uniqueIps,
}: VisitorsTableClientProps) {
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this visitor record? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    setDeleteId(id.toString());

    try {
      const response = await fetch(`/api/visitors/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVisitors(prev => prev.filter(v => v.id !== id));
        setMessage({ type: 'success', text: 'Visitor record deleted successfully' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete visitor record' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Total Visitors
          </p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {totalVisitors.toLocaleString()}
          </p>
        </div>
        <div className="glass rounded-2xl p-6">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Unique IPs
          </p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {uniqueIps.length.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Success/Error Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-xl ${
              message.type === 'success'
                ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visitors Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Browser
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Visited
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {visitors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No visitor data yet.
                  </td>
                </tr>
              ) : (
                visitors.map((visitor) => (
                  <motion.tr
                    key={visitor.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                      {visitor.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {visitor.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {visitor.device}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {visitor.browser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                        {visitor.pagePath}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {format(new Date(visitor.visitedAt), "MMM d, yyyy h:mm a")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDelete(visitor.id)}
                        disabled={isDeleting && deleteId === visitor.id.toString()}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDeleting && deleteId === visitor.id.toString() ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </>
                        )}
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
