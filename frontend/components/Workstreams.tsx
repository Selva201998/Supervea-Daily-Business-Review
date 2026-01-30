import { WorkstreamProps, ImpactLevel } from "@/types/briefing";

function ImpactBadge({ level }: { level: ImpactLevel }) {
    const colors = {
        Low: "bg-gray-100 text-gray-600",
        Medium: "bg-yellow-50 text-yellow-700",
        High: "bg-red-50 text-red-700",
        "Medium–High": "bg-orange-50 text-orange-700",
    };

    return (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[level]}`}>
            {level}
        </span>
    );
}

export function Workstreams({ workstreams }: { workstreams: WorkstreamProps[] }) {
    return (
        <div className="mb-8">
            <h2 className="premium-header mb-4">Top High-Impact Workstreams</h2>
            <div className="space-y-4">
                {workstreams.map((ws, idx) => (
                    <div key={idx} className="premium-card">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{ws.title}</h3>
                                <div className="text-sm text-slate-500 mt-1">
                                    {ws.operationalArea} • Lead: {ws.projectLead} • Sponsor: {ws.executiveSponsor}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-slate-900">{ws.progressPercent}%</div>
                                <div className="text-xs text-slate-500">Complete</div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                            <div
                                className="bg-slate-900 h-2 rounded-full"
                                style={{ width: `${ws.progressPercent}%` }}
                            ></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                            <div className="bg-slate-50 p-3 rounded-lg">
                                <span className="text-slate-500 block text-xs mb-1">Budget Impact</span>
                                <span className="font-medium">{ws.budgetImpact}</span>
                                <div className="mt-1 flex gap-2">
                                    <span className="text-xs text-slate-400">Weight:</span>
                                    <ImpactBadge level={ws.budgetWeighting} />
                                </div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg">
                                <span className="text-slate-500 block text-xs mb-1">EoY Performance</span>
                                <ImpactBadge level={ws.impactEoyPerformance} />
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-slate-700 mb-1">Why This Matters Today</h4>
                            <p className="text-sm text-slate-600">{ws.whyThisMattersToday}</p>
                        </div>

                        {ws.risksAndMitigations.length > 0 && (
                            <div className="mb-4 bg-red-50 p-3 rounded-lg border border-red-100">
                                {ws.risksAndMitigations.map((rm, i) => (
                                    <div key={i} className="text-sm">
                                        <span className="font-semibold text-red-800">Risk:</span> <span className="text-red-700">{rm.risk}</span>
                                        <div className="mt-1 pl-4 border-l-2 border-red-200">
                                            <span className="font-semibold text-red-800">Mitigation:</span> <span className="text-red-700">{rm.mitigation}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="bg-slate-900 text-white p-3 rounded-lg flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-300">Next Executive Action</span>
                            <span className="font-bold text-sm">{ws.nextExecutiveAction}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
