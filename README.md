# 🎯 Local Hunt Frontend

A frontend web application built with **Next.js** and **shadcn/ui**, supporting key business flows:
- **Campaign**: manage and participate in campaigns (check-in, voucher redemption, approvals).
- **Top-up**: deposit funds into the wallet to engage with the system.

---
<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=radix-ui&logoColor=white" alt="shadcn/ui">
</div>

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/) – React framework with SSR/SSG support.
- [shadcn/ui](https://ui.shadcn.com/) – UI component library (Radix + TailwindCSS).
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS framework.
- [TypeScript](https://www.typescriptlang.org/) – Static typing.
- [React Hook Form](https://react-hook-form.com/) – Efficient form handling.
- [Zod](https://zod.dev/) – Schema validation.
- RESTful API integration with backend services.

---

## 🔑 Features

### 1. Campaign
- Create new campaigns (allocator role).
- Approve/Manage campaigns (admin role).

### 2. Top-up
- Deposit funds into the wallet using **VietQR**.
- Bonus/discount rules applied based on top-up amount.
- Track transaction history.

### 3. General
- User authentication (register/login/logout).
- User dashboard (campaigns, top-up history).
- Notifications (toast) for transaction states.
- Responsive UI for both mobile and desktop.

---

## ⚙️ Installation & Setup

### Requirements
- Node.js >= 18
- pnpm/ npm / yarn

### Installation
```bash
# Clone repository
git clone https://github.com/nguyentrongbut/check-in-portal.git
cd check-in-portal

# Install dependencies
npm install
```
### Run Development
```bash
npm run dev
```
App will be available at: http://localhost:3000
### Build for Production
```bash
npm run build
npm start
```

## 🔧 Environment Variables
Create a .env.local file in the root directory based on the template below:
```env
# API
NEXT_PUBLIC_API_URL=YOUR_API_URL_HERE

# Google Site Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_CODE=YOUR_GOOGLE_SITE_VERIFICATION_CODE_HERE

# Cloudinary (image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME_HERE
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=YOUR_CLOUDINARY_UPLOAD_PRESET_HERE
```

