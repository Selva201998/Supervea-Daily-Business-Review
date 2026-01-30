import { RecommendationListProps } from "@/types/briefing";

export function Recommendations({ data }: { data: RecommendationListProps }) {
    return (
        <div className="mb-8 p-6 bg-slate-900 rounded-xl text-white shadow-lg">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Supervea Recommendations
            </h2>
            <ul className="space-y-2">
                {data.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="text-blue-400 mt-1">➜</span>
                        <span className="font-medium leading-relaxed">{rec}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
