export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result);
            } else {
                reject("Failed to read file as base64.");
            }
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
};
