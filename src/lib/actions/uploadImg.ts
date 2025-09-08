'use server';

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImage(file: File): Promise<string | null> {
    try {
        if (!CLOUDINARY_UPLOAD_PRESET) {
            throw new Error('Biến môi trường CLOUDINARY_UPLOAD_PRESET chưa được khai báo');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        formData.append('folder', 'local_hunt');

        const res = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            console.error('Cloudinary upload failed:', await res.text());
            return null;
        }

        const data = await res.json();

        return data.secure_url;
    } catch (error) {
        console.error('Upload error:', error);
        return null;
    }
}