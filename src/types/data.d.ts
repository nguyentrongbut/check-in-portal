export type TRole = 'admin' | 'merchant' | 'user';

export type TStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'paused'

export type TCampaign = {
    id: number,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    location: string,
    rewardPerCheckin: number,
    pointBudget: number,
    wifi: {
        ssid: string,
        bssid: string
    },
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
    campaignId: number
}