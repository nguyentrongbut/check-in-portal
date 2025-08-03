export const getColorWallet = (type: string) => {
    switch (type) {
        case "spent":
            return "text-red-800";
        case "topup":
            return "text-primary";
        default:
            return "";
    }
}