import { KPIProps, KPIStatus } from "@/types/briefing";

function StatusIndicator({ status }: { status: KPIStatus }) {
    const colors = {
        "On Track": "bg-green-500",
        "At Risk": "bg-red-500",
        "Needs Attention": "bg-amber-500",
    };

    return (
        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${colors[status]}`}></span>
    );
}

export function KpiPulse({ kpis }: { kpis: KPIProps[] }) {
    return (
        <div className="mb-8">
            <h2 className="premium-header mb-4">KPI & Goal Pulse (Executive Signal)</h2>
            <div className="premium-card">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {kpis.map((kpi, idx) => (
                        <div key={idx} className="flex items-center">
                            <StatusIndicator status={kpi.status} />
                            <div>
                                <div className="font-medium text-slate-900">{kpi.name}</div>
                                <div className="text-xs text-slate-500">{kpi.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
