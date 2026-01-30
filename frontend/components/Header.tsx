import { MetadataProps } from "@/types/briefing";

export function Header({ metadata }: { metadata: MetadataProps }) {
    return (
        <header className="mb-8 border-b pb-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Supervea Daily Briefing
                    </h1>
                    <div className="mt-2 text-slate-500 font-medium">
                        Prepared for: <span className="text-slate-900">{metadata.preparedFor}</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">{metadata.date}</div>
                    <div className="text-sm text-slate-500">Delivery: {metadata.deliveryTime}</div>
                </div>
            </div>
        </header>
    );
}
