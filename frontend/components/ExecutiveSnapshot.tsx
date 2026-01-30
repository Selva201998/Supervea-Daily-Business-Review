import { ExecutiveSnapshotProps } from "@/types/briefing";

export function ExecutiveSnapshot({ summary }: ExecutiveSnapshotProps) {
    return (
        <div className="premium-card mb-6 border-l-4 border-l-blue-600">
            <h2 className="premium-header text-blue-600">Executive Snapshot</h2>
            <p className="text-xl font-medium leading-relaxed text-slate-800">
                {summary}
            </p>
        </div>
    );
}
