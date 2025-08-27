import { TTransaction } from "@/types/data";

export interface ICalcStats {
    balance: number;
    totalTopup: number;
    totalSpent: number;
}

export function calcStats(transactions: TTransaction[]): ICalcStats {
    let totalTopup = 0;
    let totalSpent = 0;

    transactions.forEach(tx => {
        if (tx.type === "TOPUP" && tx.status === "COMPLETED") {
            totalTopup += tx.point;
        } else if (tx.type === "SPENT" && tx.status === "WITHDRAWN") {
            totalSpent += tx.point;
        }
    });

    const balance = totalTopup - totalSpent;

    return {
        balance,
        totalTopup,
        totalSpent,
    };
}
