"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function SessionStatus() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full glass animate-pulse" />
    );
  }

  if (!session) {
    return (
      <Link
        href="/admin/login"
        className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
          {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "A"}
        </div>
        <span className="hidden sm:block">{session.user?.name || "Admin"}</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 glass rounded-xl shadow-lg border border-white/10 dark:border-white/5">
          {session.user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={() => {
              signOut();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-white/10 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
