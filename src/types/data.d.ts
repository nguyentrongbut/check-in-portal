export type TRole = 'admin' | 'merchant' | 'user';

export type TStatusCampaign = 'pending' | 'approved' | 'active' | 'rejected' | 'expired' | 'cancelled'

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
    pointsEarned: number,
    pointsSpent: number,
    currentBalance: number,
}

export type TCampaign = {
    id: number,
    name: string,
    merchantName: string,
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
    status: TStatusCampaign,
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

export type TChartCampaignCheckin = {
    campaignName: string,
    checkinCount: number,
}

export type TChartDailyCheckin = {
    date: string,
    checkin: number,
}

export type TChartMapCheckin = {
    campaignName: string,
    latitude: number;
    longitude: number;
    checkinCount: number,
}

export type TChartCampaignPoint = {
    id: number,
    campaignName: string,
    usedPoint: number,
}

export type TDataDashboard = {
    title: string,
    value: number,
    desc: string,
}

export type TCampaignCheckin = {
    chart: TChartCampaignCheckin[]
    userId: number
}

export type TDailyCheckin = {
    chart: TChartDailyCheckin[]
    userId: number
}

export type TMapCheckin = {
    chart: TChartMapCheckin[]
    userId: number
}

export type TCampaignPoint = {
    chart: TChartCampaignPoint[]
    userId: number
}

export type TDashboardMetric = {
    data: TDataDashboard[]
    userId: number
}

export type TVelocity = "extreme" | "medium" | "high";

export type TSuspiciousCheckins = {
    id: number,
    userId: number,
    userName: string,
    campaignName: string,
    merchantName: string,
    checkInTime: string,
    riskScore: number,
    gpsMatch: boolean,
    wifiMatch: boolean,
    location: string,
    velocity: TVelocity,
    userLocation:string,
    previousCheckIn: string,
}

export type TTopMerchants = {
    name: string,
    investment: number,
}

export type TMonthlyRevenues = {
    month: string,
    revenue: number,
}

export type TDailyRevenues = {
    day: string,
    revenue: number,
}

export type TDashboardAdmin = {
    title: string,
    value: number,
    desc: string
}