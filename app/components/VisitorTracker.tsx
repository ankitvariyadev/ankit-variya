"use client";

import { useEffect } from "react";
import axios from "axios";

export function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Send visitor data to our API
        await axios.post("/api/visitors", {
          pagePath: window.location.pathname,
        });
      } catch (error) {
        // Silently fail - tracking should not break the site
        console.debug("Visitor tracking failed:", error);
      }
    };

    // Track immediately
    trackVisitor();

    // Also track after a short delay to ensure page load
    const timeout = setTimeout(trackVisitor, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return null; // This component doesn't render anything
}
