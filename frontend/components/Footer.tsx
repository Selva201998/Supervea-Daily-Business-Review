import { MomentumCloseProps, WhyThisWorksProps } from "@/types/briefing";

export function MomentumClose({ data }: { data: MomentumCloseProps }) {
    return (
        <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
            <h2 className="premium-header text-blue-800 mb-2">Momentum Close</h2>
            <p className="text-lg font-medium text-slate-800 italic">
                "{data.statement}"
            </p>
        </div>
    );
}

export function WhyThisWorks({ data }: { data: WhyThisWorksProps }) {
    return (
        <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Why This Briefing Works
            </h3>
            <div className="flex flex-wrap gap-4">
                {data.points.map((point, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium"
                    >
                        {point}
                    </span>
                ))}
            </div>
        </div>
    );
}
