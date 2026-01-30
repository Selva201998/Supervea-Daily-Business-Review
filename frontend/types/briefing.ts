export type ImpactLevel = "Low" | "Medium" | "High" | "Medium–High";
export type KPIStatus = "On Track" | "At Risk" | "Needs Attention";

export interface MetadataProps {
    date: string; // ISO date, e.g. "2025-05-14"
    preparedFor: string;
    deliveryTime: string; // "08:00"
}

export interface ExecutiveSnapshotProps {
    summary: string;
}

export interface RiskMitigationProps {
    risk: string;
    mitigation: string;
}

export interface WorkstreamProps {
    title: string;
    operationalArea: string;
    projectLead: string;
    executiveSponsor: string;
    progressPercent: number; // 0–100
    budgetImpact: string;
    budgetWeighting: ImpactLevel;
    impactEoyPerformance: ImpactLevel;
    whyThisMattersToday: string;
    risksAndMitigations: RiskMitigationProps[];
    nextExecutiveAction: string;
}

export interface ActionItemProps {
    action: string;
    delegationTarget?: string;
    requiresExecutiveInput: boolean;
}

export interface MeetingProps {
    time: string; // "10:30"
    title: string;
    objective: string;
    requiredOutcome: string;
}

export interface FollowUpProps {
    description: string;
}

export interface KPIProps {
    name: string;
    status: KPIStatus;
    note?: string;
}

export interface RecommendationListProps {
    recommendations: string[];
}

export interface MomentumCloseProps {
    statement: string;
}

export interface WhyThisWorksProps {
    points: string[];
}

export interface DailyExecutiveBriefingProps {
    metadata: MetadataProps;
    executiveSnapshot: ExecutiveSnapshotProps;
    highImpactWorkstreams: WorkstreamProps[];
    keyActionItems: ActionItemProps[];
    meetingsAndEvents: MeetingProps[];
    followUpsAndWatchpoints: FollowUpProps[];
    kpiGoalPulse: KPIProps[];
    superveaRecommendations: RecommendationListProps;
    momentumClose: MomentumCloseProps;
    whyThisWorks: WhyThisWorksProps;
}
