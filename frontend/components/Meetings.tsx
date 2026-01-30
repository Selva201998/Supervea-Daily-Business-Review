import { MeetingProps } from "@/types/briefing";

export function Meetings({ meetings }: { meetings: MeetingProps[] }) {
    return (
        <div className="mb-8">
            <h2 className="premium-header mb-4">Meetings & Time-Critical Events</h2>
            <div className="space-y-3">
                {meetings.map((meeting, idx) => (
                    <div key={idx} className="premium-card flex flex-col md:flex-row gap-4">
                        <div className="flex-shrink-0">
                            <div className="bg-slate-100 text-slate-900 rounded-lg p-2 text-center min-w-[80px]">
                                <span className="block text-lg font-bold">{meeting.time}</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900">{meeting.title}</h3>
                            <div className="text-sm text-slate-600 mt-1">
                                <span className="font-semibold">Objective:</span> {meeting.objective}
                            </div>
                            <div className="text-sm text-slate-600">
                                <span className="font-semibold">Required Outcome:</span> {meeting.requiredOutcome}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
