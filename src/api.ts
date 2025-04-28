import { createHash } from "crypto";
import { Player, PlayerListResponse } from "./models/playerInfo";

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET

export async function getPlayerList(): Promise<Player[]> {
    let currentTime = getCurrentTime();
    let nonce = "someRandomNonce"
    let checkSum: string = generateCheckSum(currentTime, nonce);
    let requestUrl: string = `${API_URL}/v2/player/list?count=20&start=0&name`

    const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
            'AppKey': API_KEY!,
            'Nonce': nonce,
            'CurTime': currentTime.toString(),
            'CheckSum': checkSum
        },
    });

    if(!response.ok) {
        throw new Error(`Failed to fetch player list: ${response.statusText}`);
    }

    const data: PlayerListResponse = await response.json();
    return data.rows;
}

export async function restartPlayer(playerIds: string[]): Promise<void> {
    let currentTime = getCurrentTime();
    let nonce = "someRandomNonce";
    let checkSum: string = generateCheckSum(currentTime, nonce);
    let requestUrl: string = `${API_URL}/v2/player/real-time-control/reboot}`

    console.log(currentTime);
    console.log(checkSum);

    const requestBody = {
        playerIds: ['19544a4ca30f9c4ba4782212ec92d2a7']
    };

    const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
            'AppKey': API_KEY!,
            'Nonce': nonce,
            'CurTime': currentTime.toString(),
            'CheckSum': checkSum,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if(!response.ok) {
        console.log(response);
        throw new Error(`Failed to restart player: ${response.statusText}`);
    }

    const result = await response.text();
    console.log(result);
}

function generateCheckSum(currentTime: string, nonce: string,): string {
    let date: Date = new Date();
    let nonHashedCheckSum: string = `${API_SECRET}${nonce}${currentTime}`
    console.log(nonHashedCheckSum);
    console.log(currentTime);

    return createHash('sha256').update(nonHashedCheckSum).digest('hex');
}

function getCurrentTime(): string {
    return Math.floor(Date.now() / 1000).toString();
}