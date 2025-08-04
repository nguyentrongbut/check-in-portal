export type TRole = 'admin' | 'merchant' | 'user';

export type TStatusCapaign = 'pending' | 'approved' | 'active' | 'rejected' | 'expired' | 'cancelled'

export type TStatusVoucher = 'active' | 'expired' | 'draft' | 'scheduled' | 'disabled';

export type TStatusUser = 'active' | 'inactive' | 'banned';

export type TUser = {
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    role: TRole,
    avatar: string,
    password: string,
    createdAt: string,
    updatedAt: string,
    status: TStatusUser,
}

export type TCampaign = {
    id: number,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    location: {
        lat: number,
        lng: number,
    },
    rewardPerCheckin: number,
    pointBudget: number,
    wifi: {
        ssid: string,
        bssid: string
    },
    qrUrl: string,
    used: number,
    checkIns: number,
    status: TStatusCapaign,
    createdAt: string,
    updatedAt: string,
}

export type TCheckIn = {
    id: number,
    userName: string,
    userId: number,
    checkInTime: string,
    pointsEarned: number,
    verify: string,
    campaignId: number,
    createdAt: string
}

export type TTransaction = {
    id: number,
    type: string,
    point: number,
    amount: number,
    description: string,
    campaignName: string,
    userId: number,
    createdAt: string,
}

export type TWallet = {
    id: number,
    userId: number,
    balance: number,
    totalSpent: number,
    totalTopup: number,
    createdAt: string,
    updatedAt: string
}

export type TVoucher = {
    id: number;
    title: string;
    description: string;
    image: string;
    discountType: 'fixed' | 'percent';
    discountValue: number;
    minOrderValue: number;
    maxDiscount: number;
    pointCost: number;
    quantity: number;
    claimed: number;
    startDate: string;
    endDate: string;
    status: TStatusVoucher;
    isPublished: boolean;
    userId: number;
    createdAt: string,
    updatedAt: string
}

export type TRedemption = {
    id: number,
    userName: string,
    userId: number,
    voucherId: number,
    pointsSpent: number,
    createdAt: string,
}