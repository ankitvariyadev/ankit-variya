import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ipAddress, location, device, browser, pagePath } = body;

    // Extract IP address from request headers if not provided
    let visitorIp = ipAddress;
    if (!visitorIp) {
      const xForwardedFor = request.headers.get("x-forwarded-for");
      const xRealIp = request.headers.get("x-real-ip");
      visitorIp = xForwardedFor ? xForwardedFor.split(",")[0].trim() : xRealIp || "unknown";
    }

    // Get user agent info if not provided
    let userAgentInfo = { device: device || "Unknown", browser: browser || "Unknown" };
    if (!device || !browser) {
      const userAgent = request.headers.get("user-agent") || "";
      userAgentInfo = parseUserAgent(userAgent);
    }

    // Determine page path
    const path = pagePath || request.nextUrl.pathname;

    // Fetch location from IP using ip-api.com (free, no API key required)
    let locationData = location || "Unknown";
    if (visitorIp && visitorIp !== "unknown" && visitorIp !== '::1' && !visitorIp.startsWith('192.168.') && !visitorIp.startsWith('10.')) {
      try {
        const geoResponse = await fetch(`http://ip-api.com/json/${visitorIp}?fields=status,message,country,regionName,city,isp`, {
          next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          if (geoData.status === 'success') {
            locationData = `${geoData.city || ''}, ${geoData.regionName || ''}, ${geoData.country || ''}`.replace(/^,\s*|\s*,\s*$/g, '');
          }
        }
      } catch (geoError) {
        console.debug("Geolocation fetch failed:", geoError);
        // Continue without geolocation - don't fail the request
      }
    }

    const visitor = await prisma.visitor.create({
      data: {
        ipAddress: visitorIp,
        location: locationData,
        device: userAgentInfo.device,
        browser: userAgentInfo.browser,
        pagePath: path,
        visitedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Visitor tracked", id: visitor.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to track visitor:", error);
    // Don't fail the request if tracking fails
    return NextResponse.json({ message: "Visitor tracking failed" }, { status: 500 });
  }
}

function parseUserAgent(userAgent: string): { device: string; browser: string } {
  const ua = userAgent.toLowerCase();

  // Detect device
  let device = "Desktop";
  if (/mobile|android|iphone|ipad|tablet/i.test(ua)) {
    device = /tablet/i.test(ua) ? "Tablet" : "Mobile";
  }

  // Detect browser
  let browser = "Unknown";
  if (ua.includes("chrome")) browser = "Chrome";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("safari")) browser = "Safari";
  else if (ua.includes("edge")) browser = "Edge";
  else if (ua.includes("opera")) browser = "Opera";

  return { device, browser };
}
