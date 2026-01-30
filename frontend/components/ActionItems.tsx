import { ActionItemProps } from "@/types/briefing";

export function ActionItems({ items }: { items: ActionItemProps[] }) {
    return (
        <div className="mb-8">
            <h2 className="premium-header mb-4">Key Action Items & Delegation</h2>
            <div className="premium-card">
                <ul className="space-y-3">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                            <div className={`mt-1 h-2 w-2 rounded-full ${item.requiresExecutiveInput ? 'bg-amber-500' : 'bg-green-500'}`} />
                            <div className="flex-1">
                                <div className="font-medium text-slate-800">{item.action}</div>
                                {item.delegationTarget && (
                                    <div className="text-sm text-slate-500 mt-0.5">
                                        Delegate to: <span className="font-semibold text-blue-600">{item.delegationTarget}</span>
                                    </div>
                                )}
                            </div>
                            {item.requiresExecutiveInput && (
                                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">Input Required</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
