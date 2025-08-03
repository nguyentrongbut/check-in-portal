import { ArrowUpRight, Plus} from "lucide-react";

export const getWalletTypeIcon = (type: string) => {
    switch (type) {
        case "spent":
            return <ArrowUpRight className="size-4 text-green-800" />;
        case "topup":
            return <Plus className="size-4 text-primary" />;
        default:
            return;
    }
}