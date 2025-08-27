import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/actions/transaction";
import { calcStats } from "@/utils/calcTransaction";

interface UseWalletBalanceResult {
    balance: number | null;
    loading: boolean;
    error: string | null;
}

const useWalletBalance = (): UseWalletBalanceResult => {
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWallet = async () => {
            setLoading(true);
            try {
                const res = await getTransactions();
                const data = res?.items;
                const wallet = calcStats(data);
                setBalance(wallet?.balance || 0);
            } catch (e: any) {
                console.error("Failed to load wallet", e);
                setError(e?.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };
        fetchWallet();
    }, []);

    return { balance, loading, error };
};

export default useWalletBalance;
