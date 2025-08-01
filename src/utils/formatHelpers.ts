export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

export const formatNumber = (
    value: number,
    locale: string = 'en-US',
    options?: Intl.NumberFormatOptions
) => {
    return new Intl.NumberFormat(locale, options).format(value);
};