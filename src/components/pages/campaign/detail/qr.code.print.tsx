"use client";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function QRCodePrint({ qrCodeUrl, title }: { qrCodeUrl: string; title: string }) {
    const handlePrint = () => {
        if (!qrCodeUrl) {
            toast.error("Invalid QR code URL");
            return;
        }

        try {
            const win = window.open("", "", "width=800,height=600,scrollbars=yes");

            if (!win) {
                alert("Unable to open print window. Please check your popup blocker settings.");
                return;
            }

            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>QR Code Print</title>
                    <style>
                        body {
                            text-align: center;
                            font-family: Arial, sans-serif;
                            padding: 40px;
                            margin: 0;
                        }
                        .container {
                            max-width: 400px;
                            margin: 0 auto;
                        }
                        img {
                            margin-top: 20px;
                            max-width: 100%;
                            height: auto;
                            border: 1px solid #ddd;
                            padding: 10px;
                        }
                        h2 {
                            color: #333;
                            margin-bottom: 20px;
                        }
                        h3 {
                            font-size: 24px;
                        }
                        p {
                            color: #666;
                            margin-top: 20px;
                        }
                        @media print {
                            body { padding: 20px; }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>${title}</h2>
                        <img src="${qrCodeUrl}" alt="QR Code" onerror="document.body.innerHTML='<h2>Error: Unable to load QR code</h2>';" />
                        <h3>Scan Me</h3>
                    </div>
                    <script>
                        window.onload = function() {
                            const img = document.querySelector('img');
                            if (img) {
                                img.onload = function() {
                                    setTimeout(() => {
                                        window.print();
                                    }, 500);
                                };

                                if (img.complete) {
                                    setTimeout(() => {
                                        window.print();
                                    }, 500);
                                }
                            }

                            window.onafterprint = function() {
                                window.close();
                            };
                        };

                        setTimeout(() => {
                            if (!window.closed) {
                                window.close();
                            }
                        }, 10000);
                    </script>
                </body>
                </html>
            `;

            win.document.write(htmlContent);
            win.document.close();

        } catch (error) {
            console.error("Print error:", error);
            alert("An error occurred while trying to print. Please try again.");
        }
    };

    return (
        <div>
            <Button onClick={handlePrint}>
                Print QR Code
            </Button>
        </div>
    );
}
