export interface PageInfo {
    start: number;
    end: number;
}

export interface Player {
    playerId: string;
    playerType: string;
    name: string;
    sn: string;
    version: string;
    ip: string;
    lastOnlineDate: string;
    onlineStatus: OnlineStatus;
}

export interface PlayerListResponse {
    pageInfo: PageInfo;
    total: number;
    rows: Player[];
}

export enum OnlineStatus {
    OFFLINE = 0,
    ONLINE = 1
}