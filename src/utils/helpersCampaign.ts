export const calculateTotalBudget = (points: number, checkins: number) => {
    if (!points || !checkins) return 0;
    return Math.ceil(points * checkins * 1.3);
};

export const calculateCheckins = (totalBudget: number, points: number) => {
    if (!points || !totalBudget) return 0;
    return Math.floor(totalBudget / (points * 1.3));
};

export const calculatePointsPerCheckin = (totalBudget: number, checkins: number) => {
    if (!checkins || !totalBudget) return 0;
    return Math.floor(totalBudget / (checkins * 1.3));
};