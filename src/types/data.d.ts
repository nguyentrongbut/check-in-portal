export type TRole = 'admin' | 'merchant' | 'user';

export type TStatus = 'pending' | 'approved' | 'active' | 'rejected' | 'expired' | 'cancelled'

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
    status: TStatus,
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