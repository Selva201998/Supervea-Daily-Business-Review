import { DailyExecutiveBriefingProps } from "@/types/briefing";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// Helper to convert snake_case (backend) to camelCase (frontend)
// Since we used Pydantic with standard config, the API returns snake_case keys.
// However, our TS interfaces use camelCase as per standard JS conventions.
// We need a re-mapper or we should have configured Pydantic to output camelCase.
// Given strict PDF compliance, let's assume we map it here or adjust interfaces.
// Actually, looking at the PDF 'Annexure A', the PROPS are camelCase.
// But the Pydantic models (Annexure B) are snake_case.
// So the API returns snake_case JSON.
// We should map it.

function toCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map((v) => toCamelCase(v));
    } else if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce((result, key) => {
            const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            result[camelKey] = toCamelCase(obj[key]);
            return result;
        }, {} as any);
    }
    return obj;
}

export async function getLatestBriefing(): Promise<DailyExecutiveBriefingProps> {
    // We use no-store to ensure fresh data for this daily briefing app
    const res = await fetch(`${API_BASE_URL}/briefings/latest`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to fetch briefing data");
    }

    const data = await res.json();
    return toCamelCase(data) as DailyExecutiveBriefingProps;
}
