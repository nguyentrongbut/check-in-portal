const MS_PER_DAY = 1000 * 60 * 60 * 24;

type DateInput = Date | string | number | null | undefined;

export interface CampaignLike {
    used?: number | null;
    pointBudget?: number | null;
    startDate?: DateInput;
    endDate?: DateInput;
    checkIns?: number | null;
}

/** Safely parse date, returns a valid Date object or null */
function toValidDate(input: DateInput): Date | null {
    if (input == null) return null;
    const d = input instanceof Date ? input : new Date(input);
    return isNaN(d.getTime()) ? null : d;
}

/** Calculate the number of days between two dates (rounded up). Returns 0 if end < start */
function diffDaysCeil(start: Date, end: Date): number {
    const diff = (end.getTime() - start.getTime()) / MS_PER_DAY;
    return Math.max(0, Math.ceil(diff));
}

/** Calculate the percentage of budget used. Clamped between 0–100. Returns 0 if budget <= 0 */
export function getBudgetUsedPercentage(
    used?: number | null,
    budget?: number | null
): number {
    const u = Number(used ?? 0);
    const b = Number(budget ?? 0);
    if (!isFinite(u) || !isFinite(b) || b <= 0) return 0;
    const pct = (u / b) * 100;
    return Math.min(100, Math.max(0, pct));
}

/** Get number of days remaining until endDate. Returns 0 if invalid or past */
export function getDaysRemaining(endDate?: DateInput, now: Date = new Date()): number {
    const end = toValidDate(endDate);
    if (!end) return 0;
    return diffDaysCeil(now, end);
}

/** Calculate average check-ins per day since startDate. Uses minimum of 1 day to avoid divide-by-zero */
export function getAverageCheckinsPerDay(
    checkIns?: number | null,
    startDate?: DateInput,
    now: Date = new Date()
): number {
    const total = Number(checkIns ?? 0);
    if (!isFinite(total) || total <= 0) return 0;

    const start = toValidDate(startDate);
    if (!start) return total; // no startDate means assume 1 day

    const days = Math.max(1, diffDaysCeil(start, now));
    return total / days;
}

/** Compute campaign metrics from a given campaign object */
export function makeCampaignMetrics(campaign: CampaignLike, now: Date = new Date()) {
    return {
        budgetUsedPercentage: getBudgetUsedPercentage(campaign.used, campaign.pointBudget),
        daysRemaining: getDaysRemaining(campaign.endDate, now),
        averageCheckinsPerDay: getAverageCheckinsPerDay(campaign.checkIns, campaign.startDate, now),
    };
}
