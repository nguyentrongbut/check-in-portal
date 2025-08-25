import QRCode from "qrcode";

export async function generateQRCodeBase64(value: string | object): Promise<string> {
    try {
        const text = typeof value === "string" ? value : JSON.stringify(value);
        const base64 = await QRCode.toDataURL(text, {
            errorCorrectionLevel: "H",
            type: "image/png",
            margin: 2,
            scale: 6,
        });
        return base64;
    } catch (err) {
        console.error("Failed to generate QR:", err);
        throw err;
    }
}
