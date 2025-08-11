export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

export const formatNumber = (
    value: number | string | null | undefined,
    locale: string = 'en-US',
    options?: Intl.NumberFormatOptions
): string => {
    const number = Number(value);
    if (isNaN(number)) return '0';
    return new Intl.NumberFormat(locale, options).format(number);
};

export const formatPointsToUSD = (points?: number | null): string => {
    const exchangeRate = 100;
    if (!points || isNaN(points)) return '$0 USD';
    const usd = points / exchangeRate;
    return `$${usd.toFixed(2)}`;
};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

export const formatCompactCurrency = (amount: number) => {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`
    }
    return formatCurrency(amount)
}