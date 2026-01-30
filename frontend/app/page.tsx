import { getLatestBriefing } from "@/services/api";
import { Header } from "@/components/Header";
import { ExecutiveSnapshot } from "@/components/ExecutiveSnapshot";
import { Workstreams } from "@/components/Workstreams";
import { ActionItems } from "@/components/ActionItems";
import { Meetings } from "@/components/Meetings";
import { KpiPulse } from "@/components/KpiPulse";
import { Recommendations } from "@/components/Recommendations";
import { MomentumClose, WhyThisWorks } from "@/components/Footer";

// Force dynamic rendering to ensure fresh data on every request
export const dynamic = 'force-dynamic';

export default async function Home() {
  let briefing;
  try {
    briefing = await getLatestBriefing();
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
        <div className="max-w-md bg-white p-6 rounded-xl shadow-lg border border-red-100 text-center">
          <h1 className="text-xl font-bold text-red-600 mb-2">Connection Error</h1>
          <p className="text-slate-600 mb-4">
            Is the backend server running on port 8000?
          </p>
          <div className="text-xs font-mono bg-slate-100 p-2 rounded text-slate-500">
            Error: {(error as Error).message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
        <div className="p-8 sm:p-12">

          <Header metadata={briefing.metadata} />

          <ExecutiveSnapshot summary={briefing.executiveSnapshot.summary} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Workstreams workstreams={briefing.highImpactWorkstreams} />
            </div>
            <div>
              <Recommendations data={briefing.superveaRecommendations} />
              <ActionItems items={briefing.keyActionItems} />
              <Meetings meetings={briefing.meetingsAndEvents} />
            </div>
          </div>

          <KpiPulse kpis={briefing.kpiGoalPulse} />

          <MomentumClose data={briefing.momentumClose} />

          <WhyThisWorks data={briefing.whyThisWorks} />

        </div>
      </div>
    </main>
  );
}
