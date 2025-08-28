export function generateVietQR(
    amount: number,
    addInfo: string
): string {
    const bankId = "970416"; // ACB
    const accountNumber = "30533637"; // số tài khoản
    const template = "RKMQzDU"; // template mặc định (cố định của VietQR)
    const accountName = "NGUYEN TRONG BUT"; // tên chủ tài khoản

    const encodedName = encodeURIComponent(accountName);
    const encodedInfo = encodeURIComponent(addInfo);

    return `https://api.vietqr.io/image/${bankId}-${accountNumber}-${template}.jpg?accountName=${encodedName}&amount=${amount}&addInfo=${encodedInfo}`;
}
