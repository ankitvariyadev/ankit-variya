import { prisma } from "@/lib/prisma";
import { VisitorsTableClient } from "@/app/components/admin/VisitorsTable Client";

export const dynamic = 'force-dynamic';

export default async function AdminVisitorsPage() {
  const [visitors, totalVisitors, uniqueIps] = await Promise.all([
    prisma.visitor.findMany({
      orderBy: { visitedAt: "desc" },
      take: 50,
    }),
    prisma.visitor.count(),
    prisma.visitor.groupBy({
      by: ['ipAddress'],
      _count: { ipAddress: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Visitors</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track website visitors and their activity.
        </p>
      </div>

      {/* Visitors Table Client Component */}
      <VisitorsTableClient
        initialVisitors={visitors}
        totalVisitors={totalVisitors}
        uniqueIps={uniqueIps}
      />
    </div>
  );
}
